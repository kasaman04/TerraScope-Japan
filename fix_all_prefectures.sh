#!/bin/bash

# 残りの都道府県ページからプルダウン選択機能を一括削除するスクリプト

PREFECTURES=(
    "gunma" "hiroshima" "hyogo" "ibaraki" "ishikawa" "iwate" 
    "kagawa" "kagoshima" "kochi" "kumamoto" "kyoto" "mie" 
    "miyagi" "miyazaki" "nagano" "nagasaki" "nara" "niigata" 
    "oita" "okayama" "okinawa" "saga" "saitama" "shiga" 
    "shimane" "shizuoka" "tochigi" "tokushima" "tottori" 
    "toyama" "wakayama" "yamagata" "yamaguchi" "yamanashi"
)

BASE_DIR="/mnt/c/Users/iwasa kazuma/Claude Code/外国人_土地/kasaman04.github.io/src/pages/ja/blog"

for prefecture in "${PREFECTURES[@]}"; do
    file="$BASE_DIR/$prefecture/index.astro"
    if [ -f "$file" ]; then
        echo "Processing $prefecture..."
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Remove dropdown and inline display sections using sed
        sed -i '/<!-- Selection Interface -->/,/<!-- Popular Cities Preview -->/c\
      <!-- Cities Cards -->\
      <div>' "$file"
        
        # Update description text
        sed -i 's/プルダウンから市区町村を選択して/下記の市区町村をクリックして/g' "$file"
        
        # Update card onclick events
        sed -i 's/onclick={`selectCity(\x27\${key}\x27)`}/onclick={`openCityModal(\x27\${key}\x27)`}/g' "$file"
        
        # Remove JavaScript functions
        sed -i '/function displayCityInfo/,/^    }/d' "$file"
        sed -i '/function selectCity/,/^    }/d' "$file"
        
        echo "Completed $prefecture"
    else
        echo "File not found: $file"
    fi
done

echo "All prefectures processed!"