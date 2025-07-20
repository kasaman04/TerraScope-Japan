#!/bin/bash

# 壊れたcityDataをシンプルに修正
echo "壊れたcityDataを修正中..."

# 壊れたファイルのリスト
files=($(grep -l "const cityData =     };" src/pages/ja/blog/*/index.astro))

for file in "${files[@]}"; do
    echo "修正中: $file"
    
    # 県名を抽出
    pref=$(echo "$file" | sed 's|src/pages/ja/blog/||; s|/index.astro||')
    
    # 壊れたcityDataを簡単なダミーデータで置換
    sed -i "s|const cityData =     };|const cityData = { dummy: { title: \"準備中\", features: \"準備中\" } };|g" "$file"
    
    echo "  ✅ $pref 修正完了"
done

echo "✅ 全ての壊れたcityData修正完了！"