#!/bin/bash

# 修正が必要なファイルリスト
files=(
  "src/pages/ja/blog/fukui/index.astro"
  "src/pages/ja/blog/fukuoka/index.astro"
  "src/pages/ja/blog/gifu/index.astro"
  "src/pages/ja/blog/hiroshima/index.astro"
  "src/pages/ja/blog/hyogo/index.astro"
  "src/pages/ja/blog/ishikawa/index.astro"
  "src/pages/ja/blog/kagawa/index.astro"
  "src/pages/ja/blog/kagoshima/index.astro"
  "src/pages/ja/blog/kochi/index.astro"
  "src/pages/ja/blog/kumamoto/index.astro"
  "src/pages/ja/blog/kyoto/index.astro"
  "src/pages/ja/blog/miyazaki/index.astro"
  "src/pages/ja/blog/nagano/index.astro"
  "src/pages/ja/blog/nagasaki/index.astro"
  "src/pages/ja/blog/nara/index.astro"
)

for file in "${files[@]}"; do
  echo "Fixing $file..."
  
  # 1. Remove image element
  sed -i '/<img id="modal-image"/d' "$file"
  
  # 2. Remove image JavaScript processing
  sed -i '/modal-image.*src/d' "$file"
  sed -i '/modal-image.*alt/d' "$file"
  
  # 3. Fix button (remove disabled, add id)
  sed -i 's/disabled>/>/g' "$file"
  sed -i 's/<button type="button" class="w-full bg-blue-500/<button id="modal-article-link" type="button" class="w-full bg-blue-500/g' "$file"
  
  # 4. Add click handler after description line
  sed -i '/document.getElementById('\''modal-description'\'').textContent = city.description;/a\\n      // ボタンのクリックイベントを設定\n      const articleLinkBtn = document.getElementById('\''modal-article-link'\'');\n      if (articleLinkBtn && city.pageUrl) {\n        articleLinkBtn.onclick = function() {\n          window.location.href = city.pageUrl;\n        };\n      }' "$file"
  
  echo "Fixed $file"
done

echo "All files fixed!"