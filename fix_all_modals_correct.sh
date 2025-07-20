#!/bin/bash

# 全県のモーダル機能を北海道パターンに統一
echo "全県のモーダル機能を修正中..."

prefectures=(
    "aichi" "akita" "aomori" "chiba" "ehime" "fukui" "fukuoka" "fukushima"
    "gifu" "gunma" "hiroshima" "hyogo" "ibaraki" "ishikawa"
    "iwate" "kagawa" "kanagawa" "kochi" "kumamoto" "kyoto"
    "mie" "miyagi" "miyazaki" "nagano" "nagasaki" "nara" "niigata"
    "oita" "okayama" "okinawa" "saga" "saitama" "shiga"
    "shimane" "shizuoka" "tochigi" "tokushima" "tokyo" "tottori"
    "toyama" "wakayama" "yamagata" "yamaguchi" "yamanashi"
)

for pref in "${prefectures[@]}"; do
    file_path="src/pages/ja/blog/${pref}/index.astro"
    
    if [[ -f "$file_path" ]]; then
        echo "処理中: $pref"
        
        # 都道府県の都市データ変数名を取得
        cities_var=$(grep -n "const.*Cities = {" "$file_path" | head -1 | sed 's/.*const \([a-zA-Z]*Cities\) = {.*/\1/')
        
        if [[ -n "$cities_var" ]]; then
            echo "  都市データ変数: $cities_var"
            
            # 都市データの開始と終了行を取得
            start_line=$(grep -n "const $cities_var = {" "$file_path" | cut -d: -f1)
            end_line=$(awk "NR>$start_line && /^};/" "$file_path" | head -1 | awk '{print NR+'$start_line'}')
            
            if [[ -n "$start_line" && -n "$end_line" ]]; then
                echo "    データ範囲: $start_line から $end_line"
                
                # 都市データを抽出
                sed -n "${start_line},${end_line}p" "$file_path" > "/tmp/${pref}_cities.js"
                
                # const cityData = xxCities; の行を削除
                sed -i "/const cityData = $cities_var;/d" "$file_path"
                
                # 新しいcityDataをscript内に直接挿入
                # script開始行を見つけて、その後にcityDataを挿入
                script_line=$(grep -n "<script is:inline>" "$file_path" | cut -d: -f1)
                if [[ -n "$script_line" ]]; then
                    # cityDataの定義を作成
                    {
                        echo "    // ${pref}市区町村データ"
                        echo -n "    const cityData = "
                        tail -n +2 "/tmp/${pref}_cities.js" | head -n -1 | sed 's/const [a-zA-Z]*Cities = //'
                        echo "    };"
                        echo ""
                    } > "/tmp/${pref}_citydata.js"
                    
                    # 新しいファイルを作成
                    {
                        head -n $((script_line + 1)) "$file_path"
                        cat "/tmp/${pref}_citydata.js"
                        tail -n +$((script_line + 2)) "$file_path"
                    } > "${file_path}.new"
                    
                    mv "${file_path}.new" "$file_path"
                    echo "  ✅ $pref 修正完了"
                else
                    echo "  ❌ $pref: script タグが見つかりません"
                fi
            else
                echo "  ❌ $pref: データ範囲を特定できません"
            fi
        else
            echo "  ❌ $pref: 都市データ変数が見つかりません"
        fi
    else
        echo "❌ ファイルが見つかりません: $file_path"
    fi
done

# 一時ファイルを削除
rm -f /tmp/*_cities.js /tmp/*_citydata.js

echo "✅ 全県のモーダル機能修正完了！"