#!/bin/bash

# Add missing onclick events to city cards
echo "Adding missing onclick events..."

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
        if grep -q "onclick={.*openCityModal" "$file_path"; then
            echo "$pref already has onclick - OK"
        else
            echo "Adding onclick to $pref..."
            # Find the pattern where city cards are defined and add onclick
            sed -i 's|class="\([^"]*cursor-pointer[^"]*\)"\s*>|class="\1" onclick={`openCityModal('\''${key}'\'')`}>|g' "$file_path"
            sed -i 's|class="\([^"]*cursor-pointer[^"]*\)"\s*$|class="\1" onclick={`openCityModal('\''${key}'\'')`}|g' "$file_path"
        fi
    fi
done

echo "Onclick fixes completed!"