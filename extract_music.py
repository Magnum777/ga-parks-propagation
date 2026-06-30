with open('tmp_music.html', 'r') as f:
    content = f.read()

# Find the music section
start = content.find('<section class="music"')
if start == -1:
    start = content.find('id="music"')
    if start > -1:
        section_start = content.rfind('<section', 0, start)
        start = section_start

if start > -1:
    end = content.find('</section>', start)
    if end > -1:
        section = content[start:end+10]
        print(section)
    else:
        print('No closing section tag found')
else:
    print('Music section not found')
    # Print all lines with music in them
    for i, line in enumerate(content.split('\n')):
        if 'music' in line.lower():
            print(f'Line {i}: {line.strip()}')
