#!/bin/bash

# 一括でcityDataを修正するスクリプト
echo "全県のcityDataを一括修正中..."

# すべての県をリストアップ
prefectures=(
    "aichi" "akita" "aomori" "chiba" "ehime" "fukui" "fukuoka" "fukushima"
    "gifu" "gunma" "hiroshima" "hyogo" "ibaraki" "ishikawa"
    "iwate" "kagawa" "kochi" "kumamoto" "kyoto"
    "mie" "miyagi" "miyazaki" "nagano" "nagasaki" "nara" "niigata"
    "oita" "okayama" "okinawa" "saga" "saitama" "shiga"
    "shimane" "shizuoka" "tochigi" "tokushima" "tottori"
    "toyama" "wakayama" "yamagata" "yamaguchi" "yamanashi"
)

for pref in "${prefectures[@]}"; do
    file_path="src/pages/ja/blog/${pref}/index.astro"
    
    if [[ -f "$file_path" ]]; then
        echo "処理中: $pref"
        
        # 都市データ変数名を取得
        cities_var=$(grep -n "const.*Cities = {" "$file_path" | head -1 | sed 's/.*const \([a-zA-Z]*Cities\) = {.*/\1/')
        
        if [[ -n "$cities_var" ]]; then
            # 都市データの開始と終了行を取得
            start_line=$(grep -n "const $cities_var = {" "$file_path" | cut -d: -f1)
            end_line=$(awk "NR>$start_line && /^};$/" "$file_path" | head -1 | awk '{print NR+'$start_line'}')
            
            if [[ -n "$start_line" && -n "$end_line" ]]; then
                # 都市データを抽出（articlesは除外してシンプル化）
                python3 << EOF
import re

# ファイルを読み込み
with open("$file_path", "r", encoding="utf-8") as f:
    content = f.read()

# 都市データ部分を抽出
lines = content.split('\n')
start_idx = $start_line - 1
end_idx = $end_line - 1

cities_content = '\n'.join(lines[start_idx:end_idx+1])

# articlesセクションを削除して簡素化
cleaned_content = re.sub(r',\s*articles:\s*\[[^\]]*\]', '', cities_content)

# const xxCities を const cityData に変更
cleaned_content = re.sub(r'const\s+\w+Cities\s*=', 'const cityData =', cleaned_content)

# 壊れたcityDataを置換
pattern = r'(\s*)//[^\n]*\n\s*const cityData\s*=\s*\}\s*;'
replacement = f'''\\1// {pref}市区町村データ
{cleaned_content}'''

new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)

# ファイルに書き込み
with open("$file_path", "w", encoding="utf-8") as f:
    f.write(new_content)
    
print(f"✅ {pref} 修正完了")
EOF
            else
                echo "  ❌ $pref: データ範囲を特定できません (start: $start_line, end: $end_line)"
            fi
        else
            echo "  ❌ $pref: 都市データ変数が見つかりません"
        fi
    else
        echo "❌ ファイルが見つかりません: $file_path"
    fi
done

echo "✅ 全県のcityData修正完了！"