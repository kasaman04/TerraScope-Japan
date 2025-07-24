#!/bin/bash

# 全都道府県のカード高さとタグ構造を北海道スタイルに統一
files=(
  "src/pages/ja/blog/nagano/index.astro"
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
    echo "Fixing card structure in $file..."
    
    # 1. h-48 を h-32 に変更
    sed -i 's/h-48 overflow-hidden/h-32 overflow-hidden/g' "$file"
    
    # 2. 画像のホバーエフェクトを削除
    sed -i 's/hover:scale-105 transition-transform duration-300//g' "$file"
    
    # 3. タイトルのサイズを調整
    sed -i 's/font-bold text-lg/font-bold/g' "$file"
    
    # 4. bottom-3 を bottom-2 に変更
    sed -i 's/bottom-3 left-3/bottom-2 left-3/g' "$file"
    
    echo "Fixed $file"
  else
    echo "File not found: $file"
  fi
done

echo "All prefecture card heights and titles unified to Hokkaido style!"