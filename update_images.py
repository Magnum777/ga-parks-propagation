import re

# Read the JS file
with open('C:/Users/compj/.openclaw/workspace/ga-parks-website/scripts.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update park data with images
park_images = {
    "Tallulah Gorge": "canyon-landscape.jpg",
    "Cloudland Canyon": "mountain-vista.jpg", 
    "Fort Mountain": "georgia-mountains.jpg",
    "Black Rock Mountain": "mountain-range.jpg",
    "Moccasin Creek": "waterfall-nature.jpg",
    "Unicoi": "forest-sunlight.jpg",
    "Stone Mountain": "georgia-mountains-landscape.jpg",
    "Sweetwater Creek": "river-rocks.jpg",
    "Providence Canyon": "canyon-landscape.jpg",
    "F.D. Roosevelt": "meadow-hills.jpg",
    "High Falls": "waterfall-nature.jpg",
    "Indian Springs": "forest-path.jpg",
    "Jekyll Island": "jekyll-island-beach.jpg",
    "Cumberland Island": "beach-sunset.jpg",
    "Skidaway Island": "ocean-waves.jpg",
    "Crooked River": "forest-cabin.jpg",
    "Laura S. Walker": "camping-nature.jpg",
    "Okefenokee": "forest-deep.jpg",
    "Kolomoki": "georgia-forest-trail.jpg",
    "New Echota": "forest-mist.jpg",
    "Etowah": "hiking-trail.jpg",
    "Fort Frederica": "beach-sunset.jpg",
    "Andersonville": "forest-trees.jpg",
    "Pickett": "meadow-hills.jpg"
}

# Replace emoji with image in park data
for park_name, image in park_images.items():
    # Find the line with this park and replace emoji with image field
    pattern = rf'(name: "[^"]*{park_name}[^"]*", designator: "[^"]+", region: "[^"]+", )emoji: "[^"]+"'
    replacement = rf'\1image: "images/{image}"'
    content = re.sub(pattern, replacement, content)

# Update renderParks function to use images
old_render = '''                <div class="park-image">
                        ${park.emoji}
                        <span class="park-badge ${park.region}">${park.region}</span>
                    </div>'''

new_render = '''                <div class="park-image" style="background-image: url('${park.image}'); background-size: cover; background-position: center;">
                        <span class="park-badge ${park.region}">${park.region}</span>
                    </div>'''

content = content.replace(old_render, new_render)

# Update blog posts with images
blog_images = [
    ("Tallulah Gorge", "canyon-landscape.jpg"),
    ("Gear That Survived", "radio-equipment.jpg"),
    ("Coastal Propagation", "jekyll-island-beach.jpg"),
    ("Music Behind", "featured-video-thumb.jpg"),
    ("Pine Pollen", "forest-trees.jpg"),
    ("Okefenokee", "forest-deep.jpg")
]

for title_part, image in blog_images:
    pattern = rf'(title: "[^"]*{title_part}[^"]*",\s*date: "[^"]+",\s*location: "[^"]+",\s*)emoji: "[^"]+"'
    replacement = rf'\1image: "images/{image}"'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Update blog render to use images
old_blog_render = '''                <article class="blog-card">
                    <div class="blog-image">${post.emoji}</div>'''

new_blog_render = '''                <article class="blog-card">
                    <div class="blog-image" style="background-image: url('${post.image || \'\'}'); background-size: cover; background-position: center;"></div>'''

content = content.replace(old_blog_render, new_blog_render)

# Write back
with open('C:/Users/compj/.openclaw/workspace/ga-parks-website/scripts.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("JS updated with images!")
