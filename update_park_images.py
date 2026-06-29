with open('scripts.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add images to parks
replacements = [
    ('Tallulah Gorge State Park', 'canyon-landscape.jpg'),
    ('Cloudland Canyon State Park', 'mountain-vista.jpg'),
    ('Fort Mountain State Park', 'georgia-mountains.jpg'),
    ('Black Rock Mountain State Park', 'mountain-range.jpg'),
    ('Moccasin Creek State Park', 'waterfall-nature.jpg'),
    ('Unicoi State Park', 'forest-sunlight.jpg'),
    ('Stone Mountain Park', 'georgia-mountains-landscape.jpg'),
    ('Sweetwater Creek State Park', 'river-rocks.jpg'),
    ('Providence Canyon State Park', 'canyon-landscape.jpg'),
    ('F.D. Roosevelt State Park', 'meadow-hills.jpg'),
    ('High Falls State Park', 'waterfall-nature.jpg'),
    ('Indian Springs State Park', 'forest-path.jpg'),
    ('Jekyll Island State Park', 'jekyll-island-beach.jpg'),
    ('Cumberland Island National Seashore', 'beach-sunset.jpg'),
    ('Skidaway Island State Park', 'ocean-waves.jpg'),
    ('Crooked River State Park', 'forest-cabin.jpg'),
    ('Laura S. Walker State Park', 'camping-nature.jpg'),
    ('Okefenokee National Wildlife Refuge', 'forest-deep.jpg'),
    ('Kolomoki Mounds State Park', 'georgia-forest-trail.jpg'),
    ('New Echota Historic Site', 'forest-mist.jpg'),
    ('Etowah Indian Mounds', 'hiking-trail.jpg'),
    ('Fort Frederica National Monument', 'beach-sunset.jpg'),
    ('Andersonville National Historic Site', 'forest-trees.jpg'),
    ("Pickett's Mill Battlefield", 'meadow-hills.jpg'),
]

for park_name, image in replacements:
    old = f'name: "{park_name}", designator: "K-'
    new = f'name: "{park_name}", image: "images/{image}", designator: "K-'
    content = content.replace(old, new)

# Add images to blog posts
blog_replacements = [
    ('The Final Activation: Tallulah Gorge and 231', 'canyon-landscape.jpg'),
    ('Gear That Survived Georgia Humidity', 'radio-equipment.jpg'),
    ('Coastal Propagation: Why Jekyll Island is Magic', 'jekyll-island-beach.jpg'),
    ('The Music Behind the Mission', 'featured-video-thumb.jpg'),
    ('Pine Pollen vs Portable Antennas: A Field Report', 'forest-trees.jpg'),
    ('Okefenokee at Dawn: The Activation That Almost Wasn\'t', 'forest-deep.jpg'),
]

for title, image in blog_replacements:
    old_pattern = f'title: "{title}'
    idx = content.find(old_pattern)
    if idx > 0:
        # Find the closing quote of the title
        end_idx = content.find('"', idx + len(old_pattern))
        if end_idx > 0:
            insert_pos = end_idx + 1
            content = content[:insert_pos] + f',\n            image: "images/{image}"' + content[insert_pos:]

with open('scripts.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Parks and blog posts updated with images!')
print(f'Total length: {len(content)} chars')
