#!/bin/bash

# Clean fix for modal functionality
echo "Cleaning and fixing modal functionality..."

# Reset git changes first
git checkout HEAD -- src/pages/ja/blog/*/index.astro

prefectures=(
    "aichi" "akita" "aomori" "chiba" "ehime" "fukui" "fukuoka" "fukushima"
    "gifu" "gunma" "hiroshima" "hyogo" "ibaraki" "ishikawa"
    "iwate" "kagawa" "kagoshima" "kanagawa" "kochi" "kumamoto" "kyoto"
    "mie" "miyagi" "miyazaki" "nagano" "nagasaki" "nara" "niigata"
    "oita" "okayama" "okinawa" "osaka" "saga" "saitama" "shiga"
    "shimane" "shizuoka" "tochigi" "tokushima" "tokyo" "tottori"
    "toyama" "wakayama" "yamagata" "yamaguchi" "yamanashi"
)

for pref in "${prefectures[@]}"; do
    file_path="src/pages/ja/blog/${pref}/index.astro"
    
    if [[ -f "$file_path" ]]; then
        echo "Processing $pref..."
        
        # 1. Add onclick to the main city card div (only where missing)
        if grep -q "onclick={.*openCityModal" "$file_path"; then
            echo "$pref already has onclick - skipping"
        else
            # Find the city cards div and add onclick
            sed -i 's|<div class="\([^"]*hover:shadow[^"]*cursor-pointer[^"]*\)">|<div class="\1" onclick={`openCityModal('\''${key}'\'')`}>|g' "$file_path"
            sed -i 's|<a href={city\.pageUrl} class="\([^"]*hover:shadow[^"]*cursor-pointer[^"]*\)">|<div class="\1" onclick={`openCityModal('\''${key}'\'')`}>|g' "$file_path"
            sed -i 's|</a>|</div>|g' "$file_path"
        fi
        
        # 2. Add cityData variable if missing
        if grep -q "const cityData = " "$file_path"; then
            echo "$pref already has cityData - skipping"
        else
            # Extract the cities variable name
            cities_var=$(grep "const.*Cities = {" "$file_path" | sed 's/.*const \([a-zA-Z]*Cities\) = {.*/\1/')
            if [[ -n "$cities_var" ]]; then
                # Add cityData before openCityModal function
                sed -i "/function openCityModal/i\\    const cityData = $cities_var;\\n" "$file_path"
            fi
        fi
        
        echo "Fixed $pref"
    else
        echo "File not found: $file_path"
    fi
done

echo "Clean modal fixes completed!"