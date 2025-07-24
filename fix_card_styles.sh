#!/bin/bash

# 兵庫県スタイルに統一するファイルリスト
files=(
  "src/pages/ja/blog/tokyo/index.astro"
  "src/pages/ja/blog/saitama/index.astro" 
  "src/pages/ja/blog/kanagawa/index.astro"
  "src/pages/ja/blog/fukushima/index.astro"
  "src/pages/ja/blog/chiba/index.astro"
  "src/pages/ja/blog/aomori/index.astro"
  "src/pages/ja/blog/akita/index.astro"
  "src/pages/ja/blog/kyoto/index.astro"
  "src/pages/ja/blog/fukui/index.astro"
  "src/pages/ja/blog/aichi/index.astro"
)

for file in "${files[@]}"; do
  echo "Fixing $file..."
  
  # 1. Change hover:shadow-lg to hover:shadow-xl + animation
  sed -i 's/hover:shadow-lg transition-shadow/hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2/g' "$file"
  
  # 2. Remove detail icons (SVG elements with eye icon)
  sed -i '/<!-- 右上の詳細アイコン -->/,/<\/div>/d' "$file"
  
  # 3. Fix any remaining hover:shadow-lg without transition-shadow  
  sed -i 's/hover:shadow-lg/hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2/g' "$file"
  
  echo "Fixed $file"
done

echo "All card styles unified to Hyogo style!"