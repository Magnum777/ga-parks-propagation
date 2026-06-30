// NEW FUNCTIONS TO ADD TO scripts.js
// Paste these before the // ==================== INITIALIZATION block

// ==================== ACTIVATION STATS (POTA API) ====================
async function initActivationStats() {
    const statActivations = document.getElementById('statActivations');
    const statParks = document.getElementById('statParks');
    const statQsos = document.getElementById('statQsos');
    const statHunter = document.getElementById('statHunter');
    const statHunterQsos = document.getElementById('statHunterQsos');
    const statAwards = document.getElementById('statAwards');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const progressText = document.getElementById('progressText');
    const heroParks = document.getElementById('heroParks');
    const heroQsos = document.getElementById('heroQsos');

    try {
        const response = await fetch('https://api.pota.app/profile/ae4xo');
        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        const stats = data.stats;
        const activator = stats?.activator || {};
        const hunter = stats?.hunter || {};

        if (statActivations) statActivations.textContent = activator.activations?.toLocaleString() || '--';
        if (statParks) statParks.textContent = activator.parks?.toLocaleString() || '--';
        if (statQsos) statQsos.textContent = activator.qsos?.toLocaleString() || '--';
        if (statHunter) statHunter.textContent = hunter.parks?.toLocaleString() || '--';
        if (statHunterQsos) statHunterQsos.textContent = hunter.qsos?.toLocaleString() || '--';
        if (statAwards) statAwards.textContent = stats?.awards?.toLocaleString() || '--';

        // Update hero stats too
        if (heroParks) heroParks.textContent = activator.parks || '--';
        if (heroQsos) heroQsos.textContent = (activator.qsos || 0).toLocaleString();

        // Progress bar (assuming ~300 Georgia parks total in POTA)
        const totalGeorgiaParks = 300;
        const activated = activator.parks || 0;
        const pct = Math.min(Math.round((activated / totalGeorgiaParks) * 100), 100);
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressPercent) progressPercent.textContent = pct + '%';
        if (progressText) progressText.textContent = `${activated} of ${totalGeorgiaParks} Georgia POTA parks activated`;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

// ==================== BAND CONDITIONS (NOAA API) ====================
async function initBandConditions() {
    const solarFlux = document.getElementById('solarFlux');
    const solarStatus = document.getElementById('solarStatus');
    const kIndex = document.getElementById('kIndex');
    const kStatus = document.getElementById('kStatus');
    const aIndex = document.getElementById('aIndex');
    const aStatus = document.getElementById('aStatus');
    const solarWind = document.getElementById('solarWind');
    const windStatus = document.getElementById('windStatus');
    const forecastGrid = document.getElementById('forecastGrid');

    try {
        // Fetch solar flux
        const fluxResponse = await fetch('https://services.swpc.noaa.gov/json/f107_cm_flux.json');
        if (fluxResponse.ok) {
            const fluxData = await fluxResponse.json();
            const latestFlux = fluxData[fluxData.length - 1];
            if (solarFlux) solarFlux.textContent = latestFlux.flux;
            // Solar flux interpretation
            let fluxDesc = 'Poor';
            if (latestFlux.flux >= 200) fluxDesc = 'Excellent';
            else if (latestFlux.flux >= 150) fluxDesc = 'Good';
            else if (latestFlux.flux >= 100) fluxDesc = 'Fair';
            if (solarStatus) {
                solarStatus.textContent = fluxDesc;
                solarStatus.className = 'condition-status ' + fluxDesc.toLowerCase().replace(' ', '-');
            }
        }
    } catch (e) { console.error('Flux fetch error:', e); }

    try {
        // Fetch K-index
        const kpResponse = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
        if (kpResponse.ok) {
            const kpData = await kpResponse.json();
            const latestKp = kpData[kpData.length - 1];
            if (kIndex) kIndex.textContent = latestKp.kp_index;
            // K-index interpretation
            let kpDesc = 'Unsettled';
            if (latestKp.kp_index <= 2) kpDesc = 'Quiet';
            else if (latestKp.kp_index <= 4) kpDesc = 'Active';
            else if (latestKp.kp_index <= 5) kpDesc = 'Minor Storm';
            else kpDesc = 'Major Storm';
            if (kStatus) {
                kStatus.textContent = kpDesc;
                kStatus.className = 'condition-status ' + kpDesc.toLowerCase().replace(' ', '-');
            }

            // Estimate A-index from Kp
            const estA = Math.round(latestKp.kp_index * 7.5);
            if (aIndex) aIndex.textContent = estA;
            let aDesc = 'Unsettled';
            if (estA <= 7) aDesc = 'Quiet';
            else if (estA <= 15) aDesc = 'Active';
            else if (estA <= 30) aDesc = 'Minor Storm';
            else aDesc = 'Major Storm';
            if (aStatus) {
                aStatus.textContent = aDesc;
                aStatus.className = 'condition-status ' + aDesc.toLowerCase().replace(' ', '-');
            }
        }
    } catch (e) { console.error('Kp fetch error:', e); }

    try {
        // Fetch solar wind speed (NOAA ACE endpoint - may block CORS from some origins)
        const windResponse = await fetch('https://services.swpc.noaa.gov/json/ace/swepam/speed.json');
        if (windResponse.ok) {
            const windData = await windResponse.json();
            const latestWind = windData[windData.length - 1];
            if (solarWind) solarWind.textContent = Math.round(latestWind.speed);
            let windDesc = 'Normal';
            if (latestWind.speed < 300) windDesc = 'Slow';
            else if (latestWind.speed > 600) windDesc = 'Fast';
            if (windStatus) {
                windStatus.textContent = windDesc;
                windStatus.className = 'condition-status ' + windDesc.toLowerCase();
            }
        } else {
            throw new Error('Wind fetch blocked by CORS');
        }
    } catch (e) {
        console.error('Wind fetch error:', e);
        if (solarWind) solarWind.textContent = 'N/A';
        if (windStatus) {
            windStatus.textContent = 'Unavailable';
            windStatus.className = 'condition-status unavailable';
        }
    }

    try {
        // Fetch 3-day forecast
        const fcResponse = await fetch('https://services.swpc.noaa.gov/json/predicted_f107cm_flux.json');
        if (fcResponse.ok && forecastGrid) {
            const fcData = await fcResponse.json();
            const days = fcData.slice(0, 3);
            const dayNames = ['Today', 'Tomorrow', 'Day 3'];
            forecastGrid.innerHTML = days.map((day, i) => {
                const flux = day.tencmfcst_1_day;
                let band = 'Poor';
                if (flux >= 200) band = 'Great';
                else if (flux >= 150) band = 'Good';
                else if (flux >= 100) band = 'Fair';
                return `
                    <div class="forecast-day">
                        <span class="forecast-date">${dayNames[i]}</span>
                        <span class="forecast-flux">${flux} SFU</span>
                        <span class="forecast-band ${band.toLowerCase()}">${band}</span>
                    </div>
                `;
            }).join('');
        }
    } catch (e) { console.error('Forecast fetch error:', e); }
}

// GA Parks & Propagation - API-Driven Website
// ============================================
// Data sources:
// - POTA API: spots, profile activations
// - YouTube RSS: latest video

(function() {
    'use strict';

    // ==================== DATA (Static - Parks don't change) ====================
    const parksData = [
        { name: "Tallulah Gorge State Park", image: "images/canyon-landscape.jpg", designator: "K-2341", region: "mountains", emoji: "🏔", lat: 34.7398, lng: -83.3903 },
        { name: "Cloudland Canyon State Park", image: "images/mountain-vista.jpg", designator: "K-2342", region: "mountains", emoji: "⛰", lat: 34.8317, lng: -85.4731 },
        { name: "Fort Mountain State Park", image: "images/georgia-mountains.jpg", designator: "K-2343", region: "mountains", emoji: "🏰", lat: 34.7667, lng: -84.7167 },
        { name: "Black Rock Mountain State Park", image: "images/mountain-range.jpg", designator: "K-2344", region: "mountains", emoji: "🌲", lat: 34.8667, lng: -83.4167 },
        { name: "Moccasin Creek State Park", image: "images/waterfall-nature.jpg", designator: "K-2345", region: "mountains", emoji: "💧", lat: 34.7833, lng: -83.6167 },
        { name: "Unicoi State Park", image: "images/forest-sunlight.jpg", designator: "K-2346", region: "mountains", emoji: "🌿", lat: 34.7167, lng: -83.7167 },
        { name: "Stone Mountain Park", image: "images/georgia-mountains-landscape.jpg", designator: "K-2347", region: "piedmont", emoji: "🪨", lat: 33.8061, lng: -84.1459 },
        { name: "Sweetwater Creek State Park", image: "images/river-rocks.jpg", designator: "K-2348", region: "piedmont", emoji: "🏞", lat: 33.7500, lng: -84.7167 },
        { name: "Providence Canyon State Park", image: "images/canyon-landscape.jpg", designator: "K-2349", region: "piedmont", emoji: "🏜", lat: 32.0667, lng: -84.9833 },
        { name: "F.D. Roosevelt State Park", image: "images/meadow-hills.jpg", designator: "K-2350", region: "piedmont", emoji: "🌳", lat: 32.8500, lng: -84.8000 },
        { name: "High Falls State Park", image: "images/waterfall-nature.jpg", designator: "K-2351", region: "piedmont", emoji: "💦", lat: 33.1833, lng: -83.9667 },
        { name: "Indian Springs State Park", image: "images/forest-path.jpg", designator: "K-2352", region: "piedmont", emoji: "🌸", lat: 33.3167, lng: -83.9167 },
        { name: "Jekyll Island State Park", image: "images/jekyll-island-beach.jpg", designator: "K-2353", region: "coast", emoji: "🏝", lat: 31.0667, lng: -81.4167 },
        { name: "Cumberland Island National Seashore", image: "images/beach-sunset.jpg", designator: "K-2354", region: "coast", emoji: "🐚", lat: 30.8333, lng: -81.4500 },
        { name: "Skidaway Island State Park", image: "images/ocean-waves.jpg", designator: "K-2355", region: "coast", emoji: "🦐", lat: 31.9500, lng: -81.0500 },
        { name: "Crooked River State Park", image: "images/forest-cabin.jpg", designator: "K-2356", region: "coast", emoji: "🐊", lat: 30.8667, lng: -81.5500 },
        { name: "Laura S. Walker State Park", image: "images/camping-nature.jpg", designator: "K-2357", region: "coast", emoji: "🌴", lat: 31.1333, lng: -82.2000 },
        { name: "Okefenokee National Wildlife Refuge", image: "images/forest-deep.jpg", designator: "K-2358", region: "coast", emoji: "🐸", lat: 30.7333, lng: -82.1333 },
        { name: "Kolomoki Mounds State Park", image: "images/georgia-forest-trail.jpg", designator: "K-2359", region: "historic", emoji: "🏛", lat: 31.4667, lng: -84.9167 },
        { name: "New Echota Historic Site", image: "images/forest-mist.jpg", designator: "K-2360", region: "historic", emoji: "📜", lat: 34.5500, lng: -84.9167 },
        { name: "Etowah Indian Mounds", image: "images/hiking-trail.jpg", designator: "K-2361", region: "historic", emoji: "⛺", lat: 34.1333, lng: -84.9167 },
        { name: "Fort Frederica National Monument", image: "images/beach-sunset.jpg", designator: "K-2362", region: "historic", emoji: "⚔", lat: 31.2167, lng: -81.3833 },
        { name: "Andersonville National Historic Site", image: "images/forest-trees.jpg", designator: "K-2363", region: "historic", emoji: "🕊", lat: 32.2000, lng: -84.1333 },
        { name: "Pickett's Mill Battlefield", image: "images/meadow-hills.jpg", designator: "K-2364", region: "historic", emoji: "🌾", lat: 33.9833, lng: -84.7667 },
    ];

    // ==================== NAVIGATION ====================
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                navbar.style.background = 'rgba(10, 14, 23, 0.95)';
                navbar.style.backdropFilter = 'blur(12px)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
            }

            lastScroll = currentScroll;
        });

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ==================== HERO ====================
    function initHero() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';

            setTimeout(() => {
                heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // ==================== PARKS (Static data, dynamic rendering) ====================
    function initParks() {
        const parksGrid = document.getElementById('parksGrid');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (!parksGrid) return;

        function renderParks(filter = 'all') {
            const filtered = filter === 'all'
                ? parksData
                : parksData.filter(p => p.region === filter);

            parksGrid.innerHTML = filtered.map(park => `
                <div class="park-card" data-region="${park.region}">
                    <div class="park-image" style="background-image: url('${park.image}')">
                        <span class="park-emoji">${park.emoji}</span>
                        <span class="park-designator">${park.designator}</span>
                    </div>
                    <div class="park-info">
                        <h3 class="park-name">${park.name}</h3>
                        <span class="park-badge ${park.region}">${park.region}</span>
                    </div>
                </div>
            `).join('');
        }

        renderParks();

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderParks(btn.dataset.filter);
            });
        });
    }

    // ==================== LIVE POTA SPOTS (API + Map) ====================
    async function initLiveSpots() {
        const mapContainer = document.getElementById('spotsMap');
        const spotsList = document.getElementById('spotsList');
        const spotsCount = document.getElementById('spotsCount');
        const lastUpdate = document.getElementById('lastUpdate');
        const refreshBtn = document.getElementById('refreshSpots');
        const gaOnlyCheckbox = document.getElementById('gaOnly');

        if (!mapContainer) return;

        // Initialize Leaflet map
        const map = L.map('spotsMap', {
            center: [32.8, -83.4],
            zoom: 7,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        let markers = [];
        let currentSpots = [];

        async function fetchSpots() {
            try {
                if (spotsList) spotsList.innerHTML = '<div class="spots-loading">Loading live spots...</div>';

                const response = await fetch('https://api.pota.app/spot/activator');
                if (!response.ok) throw new Error('Failed to fetch spots');

                const spots = await response.json();
                currentSpots = spots;

                renderSpots();
            } catch (error) {
                console.error('Error fetching spots:', error);
                if (spotsList) {
                    spotsList.innerHTML = '<div class="spots-error">Unable to load live spots. <button id="retrySpots">Retry</button></div>';
                    document.getElementById('retrySpots')?.addEventListener('click', fetchSpots);
                }
            }
        }

        function renderSpots() {
            const gaOnly = gaOnlyCheckbox && gaOnlyCheckbox.checked;
            const filtered = gaOnly 
                ? currentSpots.filter(s => s.locationDesc && s.locationDesc.includes('US-GA'))
                : currentSpots;

            // Clear existing markers
            markers.forEach(m => map.removeLayer(m));
            markers = [];

            const modeColors = {
                'SSB': '#3b82f6',
                'CW': '#f59e0b',
                'FT8': '#4ade80',
                'FT4': '#a855f7',
                'FT8/FT4': '#4ade80'
            };

            // Add markers for spots with lat/lng
            filtered.slice(0, 50).forEach(spot => {
                if (!spot.latitude || !spot.longitude) return;
                
                const color = modeColors[spot.mode] || '#8b9bb4';
                
                const marker = L.circleMarker([spot.latitude, spot.longitude], {
                    radius: 8,
                    fillColor: color,
                    color: color,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.6
                }).addTo(map);

                marker.bindPopup(`
                    <div style="font-family: Inter, sans-serif;">
                        <strong style="color: ${color}; font-size: 1.1rem;">${spot.activator}</strong><br>
                        <span style="color: #8b9bb4;">${spot.name || spot.reference}</span><br>
                        <span style="font-family: monospace; color: #4ade80;">${spot.frequency} kHz</span> • 
                        <span style="color: ${color};">${spot.mode}</span><br>
                        <span style="font-size: 0.8rem; color: #5a6a85;">${spot.locationDesc}</span>
                    </div>
                `);

                markers.push(marker);
            });

            // Update list
            if (spotsList) {
                spotsList.innerHTML = filtered.slice(0, 50).map((spot, i) => `
                    <div class="spot-item ${i === 0 ? 'active' : ''}" data-index="${i}">
                        <div class="spot-icon ${(spot.mode || 'Unknown').toLowerCase().replace(/\//g, '-')}">${spot.mode || '?'}</div>
                        <div class="spot-info">
                            <span class="spot-callsign">${spot.activator}</span>
                            <span class="spot-details">
                                <span class="spot-freq">${spot.frequency || '--'} kHz</span>
                                <span class="spot-park">${spot.name || spot.reference || 'Unknown'}</span>
                            </span>
                        </div>
                        <span class="spot-time">${formatTimeAgo(spot.spotTime)}</span>
                    </div>
                `).join('');
            }

            if (spotsCount) spotsCount.textContent = filtered.length;
            if (lastUpdate) lastUpdate.textContent = `Updated ${new Date().toLocaleTimeString()}`;

            // Add click handlers to spot items
            document.querySelectorAll('.spot-item').forEach(item => {
                item.addEventListener('click', () => {
                    document.querySelectorAll('.spot-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    const index = parseInt(item.dataset.index);
                    const spot = filtered[index];
                    if (spot && spot.latitude && spot.longitude) {
                        map.setView([spot.latitude, spot.longitude], 10);
                        markers.forEach(m => {
                            const markerLatLng = m.getLatLng();
                            if (Math.abs(markerLatLng.lat - spot.latitude) < 0.0001 && 
                                Math.abs(markerLatLng.lng - spot.longitude) < 0.0001) {
                                m.openPopup();
                            }
                        });
                    }
                });
            });
        }

        function formatTimeAgo(spotTime) {
            if (!spotTime) return '--';
            const now = new Date();
            const spot = new Date(spotTime);
            const diff = Math.floor((now - spot) / 60000);
            if (diff < 1) return 'Just now';
            if (diff === 1) return '1 min ago';
            if (diff < 60) return `${diff} mins ago`;
            const hours = Math.floor(diff / 60);
            return `${hours}h ago`;
        }

        fetchSpots();

        if (refreshBtn) {
            refreshBtn.addEventListener('click', fetchSpots);
        }

        if (gaOnlyCheckbox) {
            gaOnlyCheckbox.addEventListener('change', renderSpots);
        }

        // Auto-refresh every 2 minutes
        setInterval(fetchSpots, 120000);
    }

    // ==================== ACTIVATION LOG (POTA API) ====================
    async function initActivationLog() {
        const blogGrid = document.getElementById('blogGrid');
        
        if (!blogGrid) return;
        
        blogGrid.innerHTML = '<div class="blog-loading">Loading activations from POTA...</div>';
        
        try {
            const response = await fetch('https://api.pota.app/profile/ae4xo');
            if (!response.ok) throw new Error('Failed to fetch profile');
            
            const data = await response.json();
            console.log('POTA profile response:', data); // Debug
            
            // Extract activations with fallback for different API structures
            let activations = [];
            if (data.recent_activity && data.recent_activity.activations) {
                activations = data.recent_activity.activations;
            } else if (data.recent_activity && Array.isArray(data.recent_activity)) {
                activations = data.recent_activity;
            } else if (data.activations) {
                activations = data.activations;
            }
            
            console.log('Found activations:', activations.length, activations); // Debug
            
            if (!activations || activations.length === 0) {
                blogGrid.innerHTML = '<div class="blog-empty">No recent activations found. Time to get on the air! <a href="https://pota.app/#/profile/AE4XO" target="_blank">View on POTA →</a></div>';
                return;
            }
            
            // Take up to 5 recent activations
            const recent = activations.slice(0, 5);
            
            blogGrid.innerHTML = recent.map(act => {
                const date = new Date(act.date).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                });
                const total = act.total || (act.cw + act.data + act.phone) || 0;
                const modes = [];
                if (act.cw > 0) modes.push(`${act.cw} CW`);
                if (act.data > 0) modes.push(`${act.data} Data`);
                if (act.phone > 0) modes.push(`${act.phone} Phone`);
                
                return `
                    <article class="blog-card">
                        <div class="blog-image" style="background-image: url('images/field-setup.jpg')">
                            <span class="blog-date">${date}</span>
                        </div>
                        <div class="blog-content">
                            <h3 class="blog-title">${act.park || act.reference || 'Unknown Park'}</h3>
                            <p class="blog-excerpt">
                                ${total} contacts logged${modes.length > 0 ? '. ' + modes.join(', ') : ''}.
                                ${act.reference ? 'Reference: ' + act.reference + '.' : ''}
                            </p>
                            <div class="blog-footer">
                                <span class="blog-tags">
                                    <span class="tag">${act.location || 'US-GA'}</span>
                                    <span class="tag">${total} QSOs</span>
                                </span>
                                <a href="https://pota.app/#/park/${act.reference}" target="_blank" class="blog-link">Park Info →</a>
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
            
        } catch (error) {
            console.error('Error fetching activations:', error);
            blogGrid.innerHTML = `
                <div class="blog-error">
                    <p>Unable to load activations from POTA.</p>
                    <p>Error: ${error.message}</p>
                    <a href="https://pota.app/#/profile/AE4XO" target="_blank">View on POTA →</a>
                </div>
            `;
        }
    }

    // ==================== LATEST VIDEO (YouTube RSS API) ====================
    async function initLatestVideo() {
        const iframe = document.querySelector('.video-wrapper iframe');

        if (!iframe) return;

        try {
            const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCZIf1V7VeLmX2X-H88C8qCg';
            // Use a CORS proxy since YouTube RSS doesn't allow cross-origin
            const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const response = await fetch(proxyUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error('Failed to fetch YouTube feed');

            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'application/xml');

            const entries = xml.querySelectorAll('entry');
            if (entries.length === 0) throw new Error('No videos found');

            const firstEntry = entries[0];
            const videoId = firstEntry.querySelector('yt\\:videoId')?.textContent ||
                           firstEntry.querySelector('videoId')?.textContent ||
                           firstEntry.querySelector('id')?.textContent?.split(':').pop();

            if (videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (error) {
            console.error('Error fetching latest video:', error);
            iframe.insertAdjacentHTML('afterend', '<p class="video-error">Unable to load latest video. <a href="https://youtube.com/@gaparksandpropagation" target="_blank">View on YouTube →</a></p>');
        }
    }

    // ==================== FORM ====================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('formStatus');
            status.textContent = 'Message sent! 73 de AE4XO';
            status.className = 'form-status success';
            form.reset();
            setTimeout(() => { status.textContent = ''; }, 5000);
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.park-card, .blog-card, .resource-card').forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ==================== INITIALIZATION ====================
    function init() {
        initNavigation();
        initHero();
        initParks();
        initActivationLog();  // API-driven
        initLiveSpots();      // API-driven
        initLatestVideo();    // API-driven
        initActivationStats(); // API-driven
        initBandConditions();  // API-driven
        initScrollAnimations();
        initContactForm();
        initSmoothScroll();

        console.log('🦝 GA Parks & Propagation loaded');
        console.log('📡 Live data from POTA API');
        console.log('📺 Latest video from YouTube RSS');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

