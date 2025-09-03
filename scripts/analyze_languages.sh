#!/usr/bin/env bash

echo "=== Language Analysis for Safespring Web Content ==="
echo

# Function to extract language from frontmatter
get_language() {
    local file=$1
    # Check if file has frontmatter
    if ! grep -q "^---" "$file"; then
        return 1
    fi
    # Extract everything between first two --- markers
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$file")
    # Look for language field
    if echo "$frontmatter" | grep -q "language:"; then
        lang=$(echo "$frontmatter" | grep "language:" | head -n 1 | sed -E 's/language:[ ]*"?([^"]*)"?/\1/')
        echo "$lang" | tr '[:upper:]' '[:lower:]' | xargs
    else
        return 1
    fi
}

# Function to add language to frontmatter
add_language_to_frontmatter() {
    local file=$1
    local lang=$2
    # Check if file has frontmatter
    if grep -q "^---" "$file"; then
        # Add language field after first --- only
        sed -i "0,/^---$/s/^---$/---\nlanguage: \"$lang\"/" "$file"
    else
        # Create new frontmatter
        sed -i "1i---\nlanguage: \"$lang\"\n---\n" "$file"
    fi
}

# Function to get language from path
get_path_language() {
    local file=$1
    local lang=$(echo "$file" | sed -E 's|content/([^/]+)/.*|\1|')
    if [[ "$lang" =~ ^(sv|en|nb|da)$ ]]; then
        echo "$lang"
    else
        return 1
    fi
}

# Function to suggest language based on content
suggest_language() {
    local file=$1
    local content=$(cat "$file")
    
    # Try to detect language from content
    if echo "$content" | grep -qi "och\|är\|för\|att\|från\|över"; then
        echo "sv"
    elif echo "$content" | grep -qi " og \| er \| fra "; then
        echo "nb"
    else
        echo "en" # Default to English if unsure
    fi
}

# Initialize arrays for each language
declare -A sv_files en_files nb_files da_files wrong_location all_files missing_language

echo "Analyzing content structure..."

# Scan all markdown files in language directories
while IFS= read -r -d '' file; do
    all_files["$file"]=1
    
    # Get declared language from frontmatter
    declared_lang=$(get_language "$file") || declared_lang=""
    path_lang=$(get_path_language "$file")
    
    # Handle missing or empty language declaration
    if [[ -z "$declared_lang" ]]; then
        suggested_lang=$(suggest_language "$file")
        missing_language["$file"]="$suggested_lang"
        declared_lang="$suggested_lang"
    fi
    
    # Record file in appropriate language array
    case "$declared_lang" in
        "sv"|"Sv")
            sv_files["$file"]=1
            [[ "$path_lang" != "sv" ]] && wrong_location["$file"]="sv"
            ;;
        "en")
            en_files["$file"]=1
            [[ "$path_lang" != "en" ]] && wrong_location["$file"]="en"
            ;;
        "nb")
            nb_files["$file"]=1
            [[ "$path_lang" != "nb" ]] && wrong_location["$file"]="nb"
            ;;
        "da")
            da_files["$file"]=1
            [[ "$path_lang" != "da" ]] && wrong_location["$file"]="da"
            ;;
        *)
            echo "Warning: Unknown language '$declared_lang' in $file"
            ;;
    esac
done < <(find content/{sv,en,nb,da} -type f -name "*.md" -print0 2>/dev/null)

# Print summary
echo
echo "=== Content Summary ==="
echo "Swedish content: ${#sv_files[@]} files"
echo "English content: ${#en_files[@]} files"
echo "Norwegian content: ${#nb_files[@]} files"
echo "Danish content: ${#da_files[@]} files"
echo "Total content files: ${#all_files[@]} files"

# Print files missing language declaration
if [ ${#missing_language[@]} -gt 0 ]; then
    echo
    echo "=== Files Missing Language Declaration ==="
    echo "To fix these files, run:"
    for file in "${!missing_language[@]}"; do
        suggested_lang="${missing_language[$file]}"
        echo "# $file - Adding language: $suggested_lang"
        echo "sed -i '0,/^---$/s/^---$/---\\nlanguage: \"$suggested_lang\"/' \"$file\""
    done
fi

# Print files in wrong locations
if [ ${#wrong_location[@]} -gt 0 ]; then
    echo
    echo "=== Files in Wrong Language Directories ==="
    echo "To fix these files, run:"
    for file in "${!wrong_location[@]}"; do
        correct_lang="${wrong_location[$file]}"
        current_lang=$(get_path_language "$file")
        if [[ "$current_lang" != "$correct_lang" ]]; then
            subpath=$(echo "$file" | sed -E "s|content/$current_lang/||")
            new_path="content/$correct_lang/$subpath"
            if [[ "$file" != "$new_path" ]]; then
                dirname=$(dirname "$new_path")
                echo "# Moving $file to correct language directory" >> fix_languages.sh
                echo "mkdir -p \"$dirname\" && mv \"$file\" \"$new_path\"" >> fix_languages.sh
            fi
        fi
    done
fi

# Find content available in multiple languages
echo
echo "=== Content Available in Multiple Languages ==="

# Get base names without language directory and extension
declare -A base_names
for file in "${!all_files[@]}"; do
    # Extract the part after the language directory
    base=$(echo "$file" | sed -E 's|content/[^/]+/(.+)\.md|\1|')
    if [ -n "${base_names[$base]}" ]; then
        base_names[$base]=$((${base_names[$base]} + 1))
    else
        base_names[$base]=1
    fi
done

# Print content available in multiple languages
for base in "${!base_names[@]}"; do
    if [ "${base_names[$base]}" -gt 1 ]; then
        echo
        echo "Content: $base"
        echo "Available in:"
        for lang in sv en nb da; do
            if [ -f "content/$lang/$base.md" ]; then
                echo "- $lang"
            fi
        done
    fi
done

# Find content available in only one language
echo
echo "=== Content Available in Only One Language ==="
for base in "${!base_names[@]}"; do
    if [ "${base_names[$base]}" -eq 1 ]; then
        for lang in sv en nb da; do
            if [ -f "content/$lang/$base.md" ]; then
                echo "$base (only in $lang)"
                break
            fi
        done
    fi
done

# Generate fix script
echo
echo "=== Generating Fix Script ==="
echo "Creating fix_languages.sh with all necessary fixes..."

cat > fix_languages.sh << 'EOF'
#!/bin/bash
set -e

# Add missing language declarations
EOF

for file in "${!missing_language[@]}"; do
    suggested_lang="${missing_language[$file]}"
    echo "# Adding language declaration to $file"
    echo "sed -i '0,/^---$/s/^---$/---\\nlanguage: \"$suggested_lang\"/' \"$file\"" >> fix_languages.sh
done

cat >> fix_languages.sh << 'EOF'

# Move files to correct language directories
EOF

for file in "${!wrong_location[@]}"; do
    correct_lang="${wrong_location[$file]}"
    current_lang=$(get_path_language "$file")
    if [[ "$current_lang" != "$correct_lang" ]]; then
        subpath=$(echo "$file" | sed -E "s|content/$current_lang/||")
        new_path="content/$correct_lang/$subpath"
        if [[ "$file" != "$new_path" ]]; then
            dirname=$(dirname "$new_path")
            echo "# Moving $file to correct language directory" >> fix_languages.sh
            echo "mkdir -p \"$dirname\" && mv \"$file\" \"$new_path\"" >> fix_languages.sh
        fi
    fi
done

chmod +x fix_languages.sh

echo "Fix script generated as fix_languages.sh"
echo "Review the script and run it to apply all fixes" 