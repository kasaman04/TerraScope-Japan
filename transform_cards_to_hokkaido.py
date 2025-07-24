#!/usr/bin/env python3
import os
import re

# 全都道府県のカード構造を北海道スタイルに統一
files = [
    "src/pages/ja/blog/aomori/index.astro",
    "src/pages/ja/blog/iwate/index.astro",
    "src/pages/ja/blog/miyagi/index.astro",
    "src/pages/ja/blog/akita/index.astro",
    "src/pages/ja/blog/yamagata/index.astro",
    "src/pages/ja/blog/fukushima/index.astro",
    "src/pages/ja/blog/tokyo/index.astro",
    "src/pages/ja/blog/ibaraki/index.astro",
    "src/pages/ja/blog/tochigi/index.astro",
    "src/pages/ja/blog/gunma/index.astro",
    "src/pages/ja/blog/saitama/index.astro",
    "src/pages/ja/blog/chiba/index.astro",
    "src/pages/ja/blog/kanagawa/index.astro",
    "src/pages/ja/blog/niigata/index.astro",
    "src/pages/ja/blog/toyama/index.astro",
    "src/pages/ja/blog/ishikawa/index.astro",
    "src/pages/ja/blog/fukui/index.astro",
    "src/pages/ja/blog/yamanashi/index.astro",
    "src/pages/ja/blog/nagano/index.astro",
    "src/pages/ja/blog/gifu/index.astro",
    "src/pages/ja/blog/shizuoka/index.astro",
    "src/pages/ja/blog/aichi/index.astro",
    "src/pages/ja/blog/kyoto/index.astro",
    "src/pages/ja/blog/osaka/index.astro",
    "src/pages/ja/blog/mie/index.astro",
    "src/pages/ja/blog/shiga/index.astro",
    "src/pages/ja/blog/hyogo/index.astro",
    "src/pages/ja/blog/nara/index.astro",
    "src/pages/ja/blog/wakayama/index.astro",
    "src/pages/ja/blog/tottori/index.astro",
    "src/pages/ja/blog/shimane/index.astro",
    "src/pages/ja/blog/okayama/index.astro",
    "src/pages/ja/blog/hiroshima/index.astro",
    "src/pages/ja/blog/yamaguchi/index.astro",
    "src/pages/ja/blog/tokushima/index.astro",
    "src/pages/ja/blog/kagawa/index.astro",
    "src/pages/ja/blog/ehime/index.astro",
    "src/pages/ja/blog/kochi/index.astro",
    "src/pages/ja/blog/fukuoka/index.astro",
    "src/pages/ja/blog/saga/index.astro",
    "src/pages/ja/blog/nagasaki/index.astro",
    "src/pages/ja/blog/oita/index.astro",
    "src/pages/ja/blog/kumamoto/index.astro",
    "src/pages/ja/blog/miyazaki/index.astro",
    "src/pages/ja/blog/kagoshima/index.astro",
    "src/pages/ja/blog/okinawa/index.astro"
]

def transform_card_structure(content):
    """カード構造を北海道スタイルに変換"""
    # 複雑なパターンマッチングでカード全体を置換
    # 長い形式のカードを検出して北海道スタイルに変換
    
    # h-48を h-32に変更
    content = re.sub(r'h-48 overflow-hidden', 'h-32 overflow-hidden', content)
    
    # 画像のホバーエフェクトを削除
    content = re.sub(r'hover:scale-105 transition-transform duration-300', '', content)
    
    # text-lgを削除（font-boldのみ残す）
    content = re.sub(r'font-bold text-lg', 'font-bold', content)
    
    # bottom-3をbottom-2に変更
    content = re.sub(r'bottom-3 left-3', 'bottom-2 left-3', content)
    
    # タグ部分を削除し、p-4セクションを追加
    # タグがある複雑なパターンを検出して単純な北海道形式に変換
    card_pattern = re.compile(
        r'(<div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"[^>]*>)\s*'
        r'(<div class="relative h-32 overflow-hidden">)\s*'
        r'(<img[^>]*>)\s*'
        r'(<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>)\s*'
        r'(<div class="absolute bottom-2 left-3 text-white">\s*<h4 class="font-bold">\{city\.title\}</h4>\s*</div>)\s*'
        r'(?:<span[^>]*>\{[^}]*\}</span>\s*)*'  # タグ部分を無視
        r'(</div>)\s*'
        r'(?:<p[^>]*>\{city\.population\}</p>)?',  # 人口表示を無視
        re.DOTALL
    )
    
    # 北海道スタイルのカード構造
    hokkaido_card = r'''\1
              \2
                \3
                \4
                \5
              \6
              <div class="p-4">
                <p class="text-sm text-gray-600 mb-2">{city.features}</p>
                <p class="text-xs text-gray-500">{city.population}</p>
              </div>
            </div>'''
    
    # パターン置換を実行
    content = card_pattern.sub(hokkaido_card, content)
    
    return content

for file_path in files:
    if os.path.exists(file_path):
        print(f"Transforming card structure in {file_path}...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # カード構造を変換
            transformed_content = transform_card_structure(content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(transformed_content)
            
            print(f"Successfully transformed {file_path}")
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    else:
        print(f"File not found: {file_path}")

print("All prefecture card structures transformed to Hokkaido style!")