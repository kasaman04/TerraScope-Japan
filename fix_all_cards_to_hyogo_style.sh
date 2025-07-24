#!/bin/bash

# 兵庫県スタイルに統一する全都道府県ファイルリスト（兵庫県以外の46県）
files=(
  "src/pages/ja/blog/hokkaido/index.astro"
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
    echo "Fixing $file..."
    
    # 1. Change hover:shadow-lg to hover:shadow-xl + animation
    sed -i 's/hover:shadow-lg transition-shadow/hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2/g' "$file"
    
    # 2. Remove detail icons (SVG elements with eye icon) - more comprehensive pattern
    sed -i '/<!-- 右上の詳細アイコン -->/,+11d' "$file"
    
    # 3. Alternative pattern for icon removal if the comment is different
    sed -i '/<div class="absolute top-3 right-3 bg-white\/20.*>/,+6d' "$file"
    
    # 4. Fix any remaining hover:shadow-lg without transition-shadow  
    sed -i 's/hover:shadow-lg/hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2/g' "$file"
    
    echo "Fixed $file"
  else
    echo "File not found: $file"
  fi
done

echo "All 46 prefecture card styles unified to Hyogo style!"