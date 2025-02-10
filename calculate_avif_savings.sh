#!/bin/bash
# calculate_avif_savings.sh

# Initialize accumulators
total_original=0
total_avif=0
total_percent=0
count=0

# Find and process each jpg/png file recursively.
while IFS= read -r file; do
    # Construct the corresponding AVIF filename (same base name, .avif extension)
    avif_file="${file%.*}.avif"

    # Only proceed if the AVIF file exists.
    if [ -f "$avif_file" ]; then
        # Get file sizes in bytes.
        # Note: On macOS, replace "stat -c%s" with "stat -f%z"
        orig_size=$(stat -c%s "$file")
        avif_size=$(stat -c%s "$avif_file")
        
        # Calculate the saving percentage using awk.
        # Formula: saving% = (1 - avif_size/orig_size) * 100
        percent=$(awk -v avif="$avif_size" -v orig="$orig_size" 'BEGIN { printf "%.2f", (1 - avif/orig) * 100 }')
        
        echo "File: $file"
        echo "  Original: ${orig_size} bytes"
        echo "  AVIF:     ${avif_size} bytes"
        echo "  Saving:   ${percent}%"
        echo

        # Accumulate totals.
        total_original=$(( total_original + orig_size ))
        total_avif=$(( total_avif + avif_size ))
        total_percent=$(awk -v total="$total_percent" -v perc="$percent" 'BEGIN { printf "%.2f", total + perc }')
        count=$(( count + 1 ))
    fi
done < <(find . -type f \( -iname "*.jpg" -o -iname "*.png" \))

# After processing all files, display overall results.
if [ $count -gt 0 ]; then
    overall_saving=$(awk -v total_avif="$total_avif" -v total_original="$total_original" 'BEGIN { printf "%.2f", (1 - total_avif/total_original) * 100 }')
    average_percent=$(awk -v total_percent="$total_percent" -v count="$count" 'BEGIN { printf "%.2f", total_percent/count }')
    
    echo "Processed $count files."
    echo "Total original size: ${total_original} bytes"
    echo "Total AVIF size:     ${total_avif} bytes"
    echo "Overall space saving: ${overall_saving}%"
    echo "Average saving per file: ${average_percent}%"
else
    echo "No jpg/png files with a matching avif counterpart were found."
fi

