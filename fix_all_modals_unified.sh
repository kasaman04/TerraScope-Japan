#!/bin/bash

# 全都道府県のモーダルを北海道スタイルに統一
files=(
  "src/pages/ja/blog/aomori/index.astro"
  "src/pages/ja/blog/iwate/index.astro"
  "src/pages/ja/blog/miyagi/index.astro"
  "src/pages/ja/blog/akita/index.astro"
  "src/pages/ja/blog/yamagata/index.astro"
  "src/pages/ja/blog/fukushima/index.astro"
  "src/pages/ja/blog/tokyo/index.astro"
  "src/pages/ja/blog/ibaraki/index.astro"
  "src/pages/ja/blog/tochigi/index.astro"
  "src/pages/ja/blog/gunma/index.astro"
  "src/pages/ja/blog/saitama/index.astro"
  "src/pages/ja/blog/chiba/index.astro"
  "src/pages/ja/blog/kanagawa/index.astro"
  "src/pages/ja/blog/niigata/index.astro"
  "src/pages/ja/blog/toyama/index.astro"
  "src/pages/ja/blog/ishikawa/index.astro"
  "src/pages/ja/blog/fukui/index.astro"
  "src/pages/ja/blog/yamanashi/index.astro"
  "src/pages/ja/blog/nagano/index.astro"
  "src/pages/ja/blog/gifu/index.astro"
  "src/pages/ja/blog/shizuoka/index.astro"
  "src/pages/ja/blog/aichi/index.astro"
  "src/pages/ja/blog/kyoto/index.astro"
  "src/pages/ja/blog/osaka/index.astro"
  "src/pages/ja/blog/mie/index.astro"
  "src/pages/ja/blog/shiga/index.astro"
  "src/pages/ja/blog/hyogo/index.astro"
  "src/pages/ja/blog/nara/index.astro"
  "src/pages/ja/blog/wakayama/index.astro"
  "src/pages/ja/blog/tottori/index.astro"
  "src/pages/ja/blog/shimane/index.astro"
  "src/pages/ja/blog/okayama/index.astro"
  "src/pages/ja/blog/hiroshima/index.astro"
  "src/pages/ja/blog/yamaguchi/index.astro"
  "src/pages/ja/blog/tokushima/index.astro"
  "src/pages/ja/blog/kagawa/index.astro"
  "src/pages/ja/blog/ehime/index.astro"
  "src/pages/ja/blog/kochi/index.astro"
  "src/pages/ja/blog/fukuoka/index.astro"
  "src/pages/ja/blog/saga/index.astro"
  "src/pages/ja/blog/nagasaki/index.astro"
  "src/pages/ja/blog/oita/index.astro"
  "src/pages/ja/blog/kumamoto/index.astro"
  "src/pages/ja/blog/miyazaki/index.astro"
  "src/pages/ja/blog/kagoshima/index.astro"
  "src/pages/ja/blog/okinawa/index.astro"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing modal in $file..."
    
    # 1. 統一されたURL構成に修正（/TerraScope-Japanプレフィックスを削除）
    sed -i "s|window.location.href = '/TerraScope-Japan' + city.pageUrl;|window.location.href = city.pageUrl;|g" "$file"
    
    # 2. タグの色を統一（sky系をblue系に変更）
    sed -i "s|bg-sky-100 text-sky-800|bg-blue-100 text-blue-800|g" "$file"
    
    # 3. JavaScript安全性チェックを追加
    sed -i "s|function openCityModal(cityKey) {|function openCityModal(cityKey) {\n  if (!cityData || !cityData[cityKey]) {\n    console.error('City data not found for:', cityKey);\n    return;\n  }|g" "$file"
    
    # 4. モーダル要素の存在チェックを追加
    sed -i "s|const modal = document.getElementById('city-modal');|const modal = document.getElementById('city-modal');\n  if (!modal) return;|g" "$file"
    
    echo "Fixed $file"
  else
    echo "File not found: $file"
  fi
done

echo "All prefecture modals unified to Hokkaido style!"