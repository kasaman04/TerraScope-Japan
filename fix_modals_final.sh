#!/bin/bash

# Fix modal functionality for all prefecture pages
echo "Fixing modal functionality for all prefecture pages..."

# List of all prefecture directories
prefectures=(
    "aichi" "akita" "aomori" "chiba" "ehime" "fukui" "fukuoka" "fukushima"
    "gifu" "gunma" "hiroshima" "hokkaido" "hyogo" "ibaraki" "ishikawa"
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
        
        # 1. Add onclick to city cards (replace various patterns)
        # Pattern 1: <a href={city.pageUrl} class="...">
        sed -i 's|<a href={city\.pageUrl} class="\([^"]*\)">|<div class="\1" onclick={`openCityModal('\''${key}'\'')`}>|g' "$file_path"
        
        # Pattern 2: <div class="..." >
        sed -i 's|<div class="\([^"]*\)"\s*>|<div class="\1" onclick={`openCityModal('\''${key}'\'')`}>|g' "$file_path"
        
        # Pattern 3: Replace closing </a> with </div>
        sed -i 's|</a>|</div>|g' "$file_path"
        
        # 2. Add cityData variable definition right before the openCityModal function
        # Find the line with "function openCityModal" and insert cityData before it
        awk '
        /function openCityModal/ {
            # Extract prefecture variable name (e.g., "tokyoCities", "osakaCity")
            cmd = "grep -n \"const.*Cities = {\" " FILENAME
            cmd | getline cities_line
            close(cmd)
            
            if (cities_line) {
                split(cities_line, parts, ":")
                line_content = parts[2]
                match(line_content, /const ([a-zA-Z]+Cities) = \{/, matches)
                if (matches[1]) {
                    cities_var = matches[1]
                    print "    const cityData = " cities_var ";"
                    print ""
                }
            }
        }
        { print }
        ' "$file_path" > "${file_path}.tmp" && mv "${file_path}.tmp" "$file_path"
        
        echo "Fixed $pref"
    else
        echo "File not found: $file_path"
    fi
done

echo "All prefecture pages have been updated with modal functionality!"