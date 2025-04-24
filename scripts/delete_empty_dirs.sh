#!/bin/bash

# Script to delete empty directories
# Usage: ./delete_empty_dirs.sh [directory]

# Set default directory to current directory if no argument provided
target_dir="${1:-.}"

# Check if target directory exists
if [ ! -d "$target_dir" ]; then
    echo "Error: Directory '$target_dir' does not exist."
    exit 1
fi

echo "Searching for empty directories in: $target_dir"

# Find empty directories and store them in an array
# -type d : find directories
# -empty : find empty ones
# -print0: print with null terminators (handles spaces in names)
mapfile -d $'\0' empty_dirs < <(find "$target_dir" -type d -empty -print0)

# Check if any empty directories were found
if [ ${#empty_dirs[@]} -eq 0 ]; then
    echo "No empty directories found."
    exit 0
fi

# Print found empty directories
echo "Found ${#empty_dirs[@]} empty directories:"
printf '%s\n' "${empty_dirs[@]}"

# Ask for confirmation
read -p "Do you want to delete these directories? (y/N) " confirm
if [[ $confirm =~ ^[Yy]$ ]]; then
    # Delete empty directories
    find "$target_dir" -type d -empty -delete
    echo "Empty directories have been deleted."
else
    echo "Operation cancelled."
fi 