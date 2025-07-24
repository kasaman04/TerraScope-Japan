#!/bin/bash

# 兵庫県スタイルに合わせてモバイル幅を統一する全都道府県ファイルリスト（兵庫県以外の46県）
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
    echo "Fixing mobile width in $file..."
    
    # Remove justify-center max-w-4xl mx-auto from city cards grid
    sed -i 's/class="grid md:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto"/class="grid md:grid-cols-2 gap-6"/g' "$file"
    
    # Alternative pattern if spacing is different
    sed -i 's/grid md:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto/grid md:grid-cols-2 gap-6/g' "$file"
    
    echo "Fixed $file"
  else
    echo "File not found: $file"
  fi
done

echo "All prefecture mobile widths unified to Hyogo style!"