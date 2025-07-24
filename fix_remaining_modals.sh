#!/bin/bash

# 残りの修正が必要なファイルリスト
files=(
  "src/pages/ja/blog/akita/index.astro"
  "src/pages/ja/blog/aomori/index.astro"
  "src/pages/ja/blog/chiba/index.astro"
  "src/pages/ja/blog/fukushima/index.astro"
  "src/pages/ja/blog/gunma/index.astro"
  "src/pages/ja/blog/ibaraki/index.astro"
  "src/pages/ja/blog/iwate/index.astro"
  "src/pages/ja/blog/kanagawa/index.astro"
  "src/pages/ja/blog/miyagi/index.astro"
  "src/pages/ja/blog/saitama/index.astro"
  "src/pages/ja/blog/tochigi/index.astro"
  "src/pages/ja/blog/tokyo/index.astro"
  "src/pages/ja/blog/yamagata/index.astro"
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

echo "All remaining files fixed!"