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
    
    # If url_path already exists, don't modify anything
    if url_path in aliases_list:
        return content
    
    # Find the position to insert the new alias
    if format_type == 'dash':
        # Find the last alias entry to determine indentation
        lines = frontmatter.splitlines()
        aliases_start = None
        last_alias_line = None
        last_indent = ''
        
        for i, line in enumerate(lines):
            if line.strip().startswith('aliases:'):
                aliases_start = i
            if line.strip().startswith('-') and aliases_start is not None:
                last_alias_line = i
                last_indent = re.match(r'^(\s*)', line).group(1)
        
        if last_alias_line is not None:
            # Insert after the last alias with same indentation
            new_line = f"{last_indent}- {url_path}"
            lines.insert(last_alias_line + 1, new_line)
            frontmatter = '\n'.join(lines) + '\n'  # Add newline at end
        else:
            # No existing dash entries, append to aliases: line
            frontmatter = frontmatter.rstrip() + f"\n- {url_path}\n"
    
    elif format_type == 'array':
        # Find the array closing bracket and insert before it
        array_match = re.search(r'aliases:\s*\[(.*?)\]', frontmatter, re.MULTILINE | re.DOTALL)
        if array_match:
            start, end = array_match.span(1)
            existing_content = array_match.group(1)
            separator = ',' if existing_content.strip() else ''
            new_content = f'{existing_content}{separator} "{url_path}"'
            frontmatter = frontmatter[:start] + new_content + frontmatter[end:]
            if not frontmatter.endswith('\n'):
                frontmatter += '\n'
    
    elif format_type == 'single':
        # Find the single alias line and convert to dash list
        lines = frontmatter.splitlines()
        for i, line in enumerate(lines):
            if line.strip().startswith('aliases:'):
                indent = re.match(r'^(\s*)', line).group(1)
                old_alias = line.replace('aliases:', '').strip().strip('"\'')
                lines[i] = f"{indent}aliases:"
                lines.insert(i + 1, f"{indent}- {old_alias}")
                lines.insert(i + 2, f"{indent}- {url_path}")
                frontmatter = '\n'.join(lines) + '\n'  # Add newline at end
                break
    
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