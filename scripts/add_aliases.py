#!/usr/bin/env python3

import os
import re
import sys
from pathlib import Path

def get_url_path(filepath):
    """Generate the URL path from the filepath."""
    rel_path = os.path.relpath(filepath, 'content')
    url_path = '/' + rel_path.replace('_index.md', '').replace('.md', '')
    url_path = re.sub(r'/+', '/', url_path)
    if url_path.endswith('index'):
        url_path = url_path[:-5]
    if not url_path.endswith('/'):
        url_path += '/'
    return url_path

def parse_aliases(frontmatter):
    """Parse aliases from frontmatter and return the list and format type."""
    # Look for aliases section that might span multiple lines
    aliases_match = re.search(r'^aliases:\s*(?:\[.*?\]|.*?)$(?:\n(?:[ \t]*-.*?\n)*)?', frontmatter, re.MULTILINE | re.DOTALL)
    if not aliases_match:
        return [], None
    
    aliases_section = aliases_match.group(0)
    aliases_list = []
    
    # Check if it's using dash list notation
    if re.search(r'^\s*-\s', aliases_section, re.MULTILINE):
        format_type = 'dash'
        # Extract all dash list items
        for line in aliases_section.splitlines():
            if line.strip().startswith('-'):
                alias = line.strip()[1:].strip().strip('"\'')
                if alias.startswith('- '):  # Handle malformed entries
                    alias = alias[2:]
                aliases_list.append(alias)
    else:
        # Check if it's an array format
        array_match = re.search(r'aliases:\s*\[(.*?)\]', aliases_section, re.MULTILINE | re.DOTALL)
        if array_match:
            format_type = 'array'
            # Split array items and clean them
            aliases_list = [a.strip().strip('"\'') for a in array_match.group(1).split(',') if a.strip()]
        else:
            # Single string format
            format_type = 'single'
            alias = aliases_section.replace('aliases:', '').strip().strip('"\'')
            if alias:
                aliases_list.append(alias)
    
    return aliases_list, format_type

def update_or_add_aliases(content, url_path):
    """Update or add aliases to the frontmatter while preserving formatting."""
    if not content.startswith('---\n'):
        # Create new frontmatter if none exists
        return f'---\ntitle: ""\ndate: ""\ndraft: false\naliases:\n- {url_path}\n---\n{content}'

    # Find the frontmatter section
    parts = content.split('---\n', 2)
    if len(parts) < 3:
        return content

    frontmatter = parts[1]
    body = parts[2]

    # Parse existing aliases and their format
    aliases_list, format_type = parse_aliases(frontmatter)
    
    # Add new url_path if not present
    if url_path not in aliases_list:
        aliases_list.append(url_path)
    
    # Format the aliases section based on original format
    if format_type == 'dash':
        new_aliases = 'aliases:\n' + '\n'.join(f'- {alias}' for alias in aliases_list)
        # Replace the entire aliases section including any existing dash list items
        frontmatter = re.sub(
            r'^aliases:\s*(?:\[.*?\]|.*?)$(?:\n(?:[ \t]*-.*?\n)*)?',
            new_aliases + '\n',
            frontmatter,
            flags=re.MULTILINE | re.DOTALL
        )
    elif format_type == 'array':
        new_aliases = 'aliases: [' + ', '.join('"{}"'.format(alias) for alias in aliases_list) + ']'
        frontmatter = re.sub(
            r'^aliases:\s*\[.*?\]',
            new_aliases,
            frontmatter,
            flags=re.MULTILINE | re.DOTALL
        )
    elif format_type == 'single':
        # Convert to dash list format when adding multiple aliases
        new_aliases = 'aliases:\n' + '\n'.join(f'- {alias}' for alias in aliases_list)
        frontmatter = re.sub(
            r'^aliases:.*$',
            new_aliases,
            frontmatter,
            flags=re.MULTILINE
        )
    else:
        # No existing aliases, add new ones in dash list format
        frontmatter = frontmatter.rstrip() + f'\naliases:\n- {url_path}\n'

    return f'---\n{frontmatter}---\n{body}'

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        url_path = get_url_path(filepath)
        new_content = update_or_add_aliases(content, url_path)

        if new_content != content:
            print(f"Updating aliases in {filepath}")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print(f"No changes needed for {filepath}")

        print(f"Successfully processed: {filepath}")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    content_dir = 'content'
    for root, _, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                process_file(filepath)

if __name__ == '__main__':
    print("Warning, AI script. Check changes carefully.")
    main() 
    print("Warning, AI script. Check changes carefully.")