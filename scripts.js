// GA Parks & Propagation - Interactive Website
// =============================================

(function() {
    'use strict';

    // ==================== DATA ====================
    const parksData = [
        { name: "Tallulah Gorge State Park", designator: "K-2341", region: "mountains", emoji: "🏔", contacts: 47, difficulty: "Hard", lat: 34.7398, lng: -83.3903 },
        { name: "Cloudland Canyon State Park", designator: "K-2342", region: "mountains", emoji: "⛰", contacts: 52, difficulty: "Moderate", lat: 34.8317, lng: -85.4731 },
        { name: "Fort Mountain State Park", designator: "K-2343", region: "mountains", emoji: "🏰", contacts: 38, difficulty: "Moderate", lat: 34.7667, lng: -84.7167 },
        { name: "Black Rock Mountain State Park", designator: "K-2344", region: "mountains", emoji: "🌲", contacts: 41, difficulty: "Hard", lat: 34.8667, lng: -83.4167 },
        { name: "Moccasin Creek State Park", designator: "K-2345", region: "mountains", emoji: "💧", contacts: 29, difficulty: "Easy", lat: 34.7833, lng: -83.6167 },
        { name: "Unicoi State Park", designator: "K-2346", region: "mountains", emoji: "🌿", contacts: 44, difficulty: "Easy", lat: 34.7167, lng: -83.7167 },
        { name: "Stone Mountain Park", designator: "K-2347", region: "piedmont", emoji: "🪨", contacts: 63, difficulty: "Easy", lat: 33.8061, lng: -84.1459 },
        { name: "Sweetwater Creek State Park", designator: "K-2348", region: "piedmont", emoji: "🏞", contacts: 35, difficulty: "Easy", lat: 33.7500, lng: -84.7167 },
        { name: "Providence Canyon State Park", designator: "K-2349", region: "piedmont", emoji: "🏜", contacts: 28, difficulty: "Moderate", lat: 32.0667, lng: -84.9833 },
        { name: "F.D. Roosevelt State Park", designator: "K-2350", region: "piedmont", emoji: "🌳", contacts: 56, difficulty: "Moderate", lat: 32.8500, lng: -84.8000 },
        { name: "High Falls State Park", designator: "K-2351", region: "piedmont", emoji: "💦", contacts: 33, difficulty: "Easy", lat: 33.1833, lng: -83.9667 },
        { name: "Indian Springs State Park", designator: "K-2352", region: "piedmont", emoji: "🌸", contacts: 31, difficulty: "Easy", lat: 33.3167, lng: -83.9167 },
        { name: "Jekyll Island State Park", designator: "K-2353", region: "coast", emoji: "🏝", contacts: 49, difficulty: "Easy", lat: 31.0667, lng: -81.4167 },
        { name: "Cumberland Island National Seashore", designator: "K-2354", region: "coast", emoji: "🐚", contacts: 42, difficulty: "Hard", lat: 30.8333, lng: -81.4500 },
        { name: "Skidaway Island State Park", designator: "K-2355", region: "coast", emoji: "🦐", contacts: 37, difficulty: "Easy", lat: 31.9500, lng: -81.0500 },
        { name: "Crooked River State Park", designator: "K-2356", region: "coast", emoji: "🐊", contacts: 26, difficulty: "Moderate", lat: 30.8667, lng: -81.5500 },
        { name: "Laura S. Walker State Park", designator: "K-2357", region: "coast", emoji: "🌴", contacts: 22, difficulty: "Easy", lat: 31.1333, lng: -82.2000 },
        { name: "Okefenokee National Wildlife Refuge", designator: "K-2358", region: "coast", emoji: "🐸", contacts: 31, difficulty: "Hard", lat: 30.7333, lng: -82.1333 },
        { name: "Kolomoki Mounds State Park", designator: "K-2359", region: "historic", emoji: "🏛", contacts: 24, difficulty: "Easy", lat: 31.4667, lng: -84.9167 },
        { name: "New Echota Historic Site", designator: "K-2360", region: "historic", emoji: "📜", contacts: 19, difficulty: "Easy", lat: 34.5500, lng: -84.9167 },
        { name: "Etowah Indian Mounds", designator: "K-2361", region: "historic", emoji: "⛺", contacts: 27, difficulty: "Easy", lat: 34.1333, lng: -84.9167 },
        { name: "Fort Frederica National Monument", designator: "K-2362", region: "historic", emoji: "⚔", contacts: 35, difficulty: "Moderate", lat: 31.2167, lng: -81.3833 },
        { name: "Andersonville National Historic Site", designator: "K-2363", region: "historic", emoji: "🕊", contacts: 21, difficulty: "Easy", lat: 32.2000, lng: -84.1333 },
        { name: "Pickett's Mill Battlefield", designator: "K-2364", region: "historic", emoji: "🌾", contacts: 18, difficulty: "Easy", lat: 33.9833, lng: -84.7667 },
    ];

    const blogPosts = [
        {
            title: "The Final Activation: Tallulah Gorge and 231",
            date: "June 15, 2026",
            location: "Tallulah Gorge, GA",
            emoji: "🏔",
            excerpt: "Four years. 231 parks. One last activation at the most dramatic location in Georgia. Here's how it went down, complete with propagation data and the emotional CQ that finished it.",
            tags: ["Milestone", "Mountains", "Final Activation"],
            readTime: "8 min"
        },
        {
            title: "Gear That Survived Georgia Humidity",
            date: "May 28, 2026",
            location: "Various Parks",
            emoji: "⚡",
            excerpt: "After 4 years in Georgia's notorious humidity, here's what equipment held up and what rusted, corroded, or mysteriously gained sentience. A survival guide for POTA gear.",
            tags: ["Gear", "Field Test", "Humidity"],
            readTime: "6 min"
        },
        {
            title: "Coastal Propagation: Why Jekyll Island is Magic",
            date: "April 10, 2026",
            location: "Jekyll Island, GA",
            emoji: "🏝",
            excerpt: "Salt air, low elevation, and somehow 49 contacts in 3 hours. I broke down the propagation data to understand why coastal Georgia POTA activations punch above their weight.",
            tags: ["Propagation", "Coast", "Science"],
            readTime: "5 min"
        },
        {
            title: "The Music Behind the Mission",
            date: "March 22, 2026",
            location: "Warner Robins, GA",
            emoji: "🎵",
            excerpt: "How WD4DAN and I turned activation stories into songs. The story behind '231 Parks' — from lyrics scribbled on a log sheet to a fully-produced track.",
            tags: ["Music", "WD4DAN", "Behind the Scenes"],
            readTime: "7 min"
        },
        {
            title: "Pine Pollen vs Portable Antennas: A Field Report",
            date: "March 8, 2026",
            location: "Providence Canyon, GA",
            emoji: "🌲",
            excerpt: "Everything in Georgia is covered in yellow dust for 3 weeks every spring. Including your antenna. Here's what actually works when pollen attacks your SWR.",
            tags: ["Antenna", "Spring", "Problem Solving"],
            readTime: "4 min"
        },
        {
            title: "Okefenokee at Dawn: The Activation That Almost Wasn't",
            date: "February 14, 2026",
            location: "Okefenokee NWR, GA",
            emoji: "🐊",
            excerpt: "Gators, mosquitos, and a blown fuse at 6 AM. The swamp doesn't care about your activation schedule. Here's how I made 31 contacts anyway.",
            tags: ["Adventure", "Swamp", "Coast"],
            readTime: "9 min"
        }
    ];

    // ==================== NAVIGATION ====================
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(10, 14, 23, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 14, 23, 0.85)';
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
        
        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ==================== PARKS ====================
    function initParks() {
        const parksGrid = document.getElementById('parksGrid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const loadMoreBtn = document.getElementById('loadMoreParks');
        
        let currentFilter = 'all';
        let visibleCount = 12;
        
        function renderParks() {
            const filtered = currentFilter === 'all' 
                ? parksData 
                : parksData.filter(p => p.region === currentFilter);
            
            const toShow = filtered.slice(0, visibleCount);
            
            parksGrid.innerHTML = toShow.map(park => `
                <div class="park-card" data-region="${park.region}">
                    <div class="park-image">
                        ${park.emoji}
                        <span class="park-badge ${park.region}">${park.region}</span>
                    </div>
                    <div class="park-content">
                        <h3 class="park-name">${park.name}</h3>
                        <span class="park-designator">${park.designator}</span>
                        <div class="park-meta">
                            <span>${park.contacts} contacts</span>
                            <span>•</span>
                            <span>${park.difficulty}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Show/hide load more
            loadMoreBtn.style.display = visibleCount < filtered.length ? 'inline-flex' : 'none';
        }
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                visibleCount = 12;
                renderParks();
            });
        });
        
        // Load more
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 8;
            renderParks();
        });
        
        renderParks();
    }

    // ==================== LIVE POTA SPOTS MAP ====================
    function initLiveSpots() {
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
        
        // Add dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        
        // Move zoom control to bottom right
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        
        // Store markers
        let markers = [];
        let currentSpots = [];
        
        // Mock spot data (in production, fetch from https://api.pota.app/spot/activator)
        function generateMockSpots() {
            const modes = ['SSB', 'CW', 'FT8', 'FT4'];
            const spots = [];
            
            // Generate some spots in and around Georgia
            for (let i = 0; i < 25; i++) {
                const isGA = Math.random() > 0.3;
                const lat = isGA ? 30 + Math.random() * 4 : 25 + Math.random() * 15;
                const lng = isGA ? -85 + Math.random() * 4 : -95 + Math.random() * 20;
                
                spots.push({
                    callsign: `W${Math.floor(Math.random() * 9)}ABC`,
                    park: isGA ? `K-${2340 + Math.floor(Math.random() * 24)}` : `K-${1000 + Math.floor(Math.random() * 1000)}`,
                    freq: (7 + Math.random() * 21).toFixed(3),
                    mode: modes[Math.floor(Math.random() * modes.length)],
                    locationDesc: isGA ? 'US-GA' : `US-${['FL', 'TN', 'SC', 'AL', 'NC'][Math.floor(Math.random() * 5)]}`,
                    lat: lat,
                    lng: lng,
                    isGA: isGA,
                    time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                });
            }
            
            return spots.sort((a, b) => new Date(b.time) - new Date(a.time));
        }
        
        function renderSpots(spots) {
            const gaOnly = gaOnlyCheckbox.checked;
            const filtered = gaOnly ? spots.filter(s => s.isGA) : spots;
            
            // Clear existing markers
            markers.forEach(m => map.removeLayer(m));
            markers = [];
            
            // Add markers
            filtered.forEach(spot => {
                const modeColors = {
                    'SSB': '#3b82f6',
                    'CW': '#f59e0b',
                    'FT8': '#4ade80',
                    'FT4': '#a855f7'
                };
                
                const color = modeColors[spot.mode] || '#8b9bb4';
                
                const marker = L.circleMarker([spot.lat, spot.lng], {
                    radius: 8,
                    fillColor: color,
                    color: color,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.6
                }).addTo(map);
                
                marker.bindPopup(`
                    <div style="font-family: Inter, sans-serif;">
                        <strong style="color: ${color}; font-size: 1.1rem;">${spot.callsign}</strong><br>
                        <span style="color: #8b9bb4;">${spot.park}</span><br>
                        <span style="font-family: monospace; color: #4ade80;">${spot.freq} MHz</span> • 
                        <span style="color: ${color};">${spot.mode}</span><br>
                        <span style="font-size: 0.8rem; color: #5a6a85;">${spot.locationDesc}</span>
                    </div>
                `);
                
                markers.push(marker);
            });
            
            // Update spots list
            spotsList.innerHTML = filtered.slice(0, 50).map((spot, i) => `
                <div class="spot-item ${i === 0 ? 'active' : ''}" data-index="${i}">
                    <div class="spot-icon ${spot.mode.toLowerCase()}">${spot.mode}</div>
                    <div class="spot-info">
                        <span class="spot-callsign">${spot.callsign}</span>
                        <span class="spot-details">
                            <span class="spot-freq">${spot.freq} MHz</span>
                            <span class="spot-park">${spot.park}</span>
                        </span>
                    </div>
                    <span class="spot-time">${spot.time}</span>
                </div>
            `).join('');
            
            // Update count
            spotsCount.textContent = filtered.length;
            lastUpdate.textContent = `Updated ${new Date().toLocaleTimeString()}`;
            
            // Add click handlers to spot items
            document.querySelectorAll('.spot-item').forEach(item => {
                item.addEventListener('click', () => {
                    document.querySelectorAll('.spot-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    const index = parseInt(item.dataset.index);
                    const spot = filtered[index];
                    if (spot) {
                        map.flyTo([spot.lat, spot.lng], 10, { duration: 1 });
                        markers[index]?.openPopup();
                    }
                });
            });
        }
        
        function loadSpots() {
            refreshBtn.disabled = true;
            refreshBtn.textContent = '🔄 Loading...';
            
            // Simulate API call
            setTimeout(() => {
                currentSpots = generateMockSpots();
                renderSpots(currentSpots);
                refreshBtn.disabled = false;
                refreshBtn.textContent = '🔄 Refresh';
            }, 800);
        }
        
        // Event listeners
        refreshBtn.addEventListener('click', loadSpots);
        gaOnlyCheckbox.addEventListener('change', () => renderSpots(currentSpots));
        
        // Initial load
        loadSpots();
        
        // Auto-refresh every 2 minutes
        setInterval(loadSpots, 120000);
    }

    // ==================== BLOG ====================
    function initBlog() {
        const blogGrid = document.getElementById('blogGrid');
        const loadMoreBtn = document.getElementById('loadMorePosts');
        
        let visibleCount = 3;
        
        function renderPosts() {
            const toShow = blogPosts.slice(0, visibleCount);
            
            blogGrid.innerHTML = toShow.map(post => `
                <article class="blog-card">
                    <div class="blog-image">${post.emoji}</div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span>📅 ${post.date}</span>
                            <span>📍 ${post.location}</span>
                            <span>⏱ ${post.readTime}</span>
                        </div>
                        <h3 class="blog-title">${post.title}</h3>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <div class="blog-tags">
                            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </article>
            `).join('');
            
            loadMoreBtn.style.display = visibleCount < blogPosts.length ? 'inline-flex' : 'none';
        }
        
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 3;
            renderPosts();
        });
        
        renderPosts();
    }

    // ==================== CONTACT FORM ====================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const status = document.getElementById('formStatus');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate sending (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Log to console (for demo)
            console.log('Form submitted:', data);
            
            // Show success
            status.textContent = '73! Message received — I\'ll get back to you on the next activation.';
            status.className = 'form-status success';
            form.reset();
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Hide status after 5 seconds
            setTimeout(() => {
                status.className = 'form-status';
            }, 5000);
        });
    }

    // ==================== ANIMATIONS ====================
    function initAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Add animation to cards
        document.querySelectorAll('.park-card, .blog-card, .resource-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        // Hero text animation
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

    // ==================== MUSIC PLAYER ====================
    function initMusicPlayer() {
        const trackPlays = document.querySelectorAll('.track-play');
        
        trackPlays.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoId = btn.dataset.video;
                // In production, this would open a modal or redirect to YouTube
                window.open(`https://youtube.com/watch?v=${videoId}`, '_blank');
            });
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ==================== INITIALIZATION ====================
    function init() {
        initNavigation();
        initParks();
        initLiveSpots();
        initBlog();
        initContactForm();
        initAnimations();
        initMusicPlayer();
        initSmoothScroll();
        
        console.log('🦝 GA Parks & Propagation website loaded');
        console.log('📻 231 parks. Infinite stories. One frequency at a time.');
        console.log('🗺 Live POTA spots map initialized');
        console.log('📡 QRZ profile section loaded');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
