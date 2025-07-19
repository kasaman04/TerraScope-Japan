#!/usr/bin/env node

/**
 * ブログページにモーダル機能を自動追加するスクリプト
 * 使用方法: node scripts/add-modal-to-blog-pages.js
 */

const fs = require('fs');
const path = require('path');

// 設定
const BLOG_PAGES_DIR = 'src/pages/ja/blog';
const SKIP_DIRS = ['index.astro']; // スキップするファイル

// 標準記事データテンプレート
const STANDARD_ARTICLES = `// 記事データ
const articles = [
  {
    id: "article-01",
    icon: "🛡️",
    title: "防災：地震・水害リスクと避難体制",
    description: "{{CITY_NAME}}の災害リスクと外国人向け防災情報を詳しく解説",
    date: "2024-01-15"
  },
  {
    id: "article-02", 
    icon: "🏥",
    title: "生活インフラ：スーパー・病院・学校",
    description: "日常生活に必要な施設の場所と利用方法を紹介",
    date: "2024-01-18"
  },
  {
    id: "article-03",
    icon: "💰",
    title: "生活コスト：家賃・光熱費・交通費など",
    description: "{{CITY_NAME}}での実際の生活費用を具体的に算出",
    date: "2024-01-22"
  },
  {
    id: "article-04",
    icon: "🏗️",
    title: "再開発・公共整備：今後の暮らしやすさ",
    description: "{{CITY_NAME}}周辺の開発計画と将来の街の変化",
    date: "2024-01-25"
  },
  {
    id: "article-05",
    icon: "📜",
    title: "法制度：外国人の購入制限・手続き",
    description: "不動産購入や賃貸契約時の注意点と必要書類",
    date: "2024-01-28"
  },
  {
    id: "article-06",
    icon: "📷",
    title: "現地調査レポート：映像と写真で見る街",
    description: "実際に歩いて撮影した{{CITY_NAME}}の街並みと雰囲気",
    date: "2024-02-01"
  }
];`;

/**
 * ファイル内容を解析してページ情報を抽出
 */
function parsePageInfo(content, filePath) {
  const pathParts = filePath.split('/');
  const prefectureSlug = pathParts[pathParts.length - 3];
  const citySlug = pathParts[pathParts.length - 2];
  
  // タイトルから市区町村名を抽出
  const titleMatch = content.match(/const title = ["']([^"']*?)["']/);
  const title = titleMatch ? titleMatch[1] : '';
  
  // 市区町村名を推定
  const cityNameMatch = title.match(/([^・]+?)[市区町村]/);
  const cityName = cityNameMatch ? cityNameMatch[1] + (title.includes('市') ? '市' : title.includes('区') ? '区' : title.includes('町') ? '町' : '村') : citySlug;
  
  // 都道府県名を推定
  const prefectureNames = {
    'tokyo': '東京都',
    'osaka': '大阪府',
    'kanagawa': '神奈川県',
    'hokkaido': '北海道',
    'kyoto': '京都府',
    'hyogo': '兵庫県',
    'aichi': '愛知県',
    'fukuoka': '福岡県',
    'saitama': '埼玉県',
    'chiba': '千葉県'
  };
  const prefectureName = prefectureNames[prefectureSlug] || prefectureSlug;
  
  return {
    cityName,
    prefectureName,
    citySlug,
    prefectureSlug
  };
}

/**
 * BlogModalのimportを追加
 */
function addBlogModalImport(content) {
  if (content.includes('BlogModal')) {
    return content; // 既に追加済み
  }
  
  const importMatch = content.match(/(import BaseLayout[^;]+;)/);
  if (importMatch) {
    return content.replace(
      importMatch[1],
      importMatch[1] + "\\nimport BlogModal from '../../../../../components/BlogModal.astro';"
    );
  }
  
  return content;
}

/**
 * 記事データを追加または更新
 */
function addOrUpdateArticlesData(content, cityName) {
  // 既に記事データがある場合はスキップ
  if (content.includes('const articles = [')) {
    return content;
  }
  
  const articlesData = STANDARD_ARTICLES.replace(/{{CITY_NAME}}/g, cityName);
  
  // const lang = "ja"; の後に挿入
  const langMatch = content.match(/(const lang = ["']ja["'];)/);
  if (langMatch) {
    return content.replace(
      langMatch[1],
      langMatch[1] + "\\n\\n" + articlesData
    );
  }
  
  return content;
}

/**
 * 記事カードをモーダル対応に変更
 */
function convertArticleCardsToModal(content, themeColor, prefectureSlug, citySlug) {
  // 既存のaタグベースの記事カードを検索
  const cardPattern = /<a\\s+href=\\{[^}]*\\}[^>]*class="[^"]*bg-white[^"]*rounded-xl[^"]*>[\\s\\S]*?<\\/a>/g;
  
  // より簡単なアプローチ：記事セクション全体を置換
  if (content.includes('articles.map')) {
    return content; // 既に動的記事カードを使用している
  }
  
  // 静的な記事カードセクションを動的なものに置換
  const articleSectionPattern = /<div class="grid md:grid-cols-2[^>]*>[\\s\\S]*?(?=<\\/div>\\s*<\\/div>\\s*<\\/section>)/;
  const gridMatch = content.match(articleSectionPattern);
  
  if (gridMatch) {
    const dynamicGrid = `<div class="grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div 
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-200 cursor-pointer"
            data-article-id={article.id}
          >
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-4">{article.icon}</span>
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-${themeColor}-600 transition-colors">
                {article.title}
              </h3>
            </div>
            <p class="text-gray-600 mb-4">
              {article.description}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('ja-JP')}
              </span>
              <div class="flex items-center gap-2">
                <button class="text-${themeColor}-600 hover:text-${themeColor}-800 text-sm font-medium">
                  クイックビュー
                </button>
                <a 
                  href={\\`/ja/blog/${prefectureSlug}/${citySlug}/\\${article.id}/\\`}
                  class="text-${themeColor}-600 hover:text-${themeColor}-800 text-sm font-medium flex items-center gap-1"
                  onclick="event.stopPropagation()"
                >
                  完全版
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>`;
    
    return content.replace(gridMatch[0], dynamicGrid);
  }
  
  return content;
}

/**
 * モーダルコンポーネントを追加
 */
function addModalComponents(content, cityName, prefectureName) {
  if (content.includes('<!-- Modals -->')) {
    return content; // 既に追加済み
  }
  
  const modalSection = `
  <!-- Modals -->
  {articles.map((article) => (
    <BlogModal article={article} cityName="${cityName}" prefectureName="${prefectureName}" />
  ))}`;
  
  return content.replace('</BaseLayout>', modalSection + '\\n</BaseLayout>');
}

/**
 * テーマカラーを推定
 */
function guessThemeColor(content) {
  if (content.includes('text-green-')) return 'green';
  if (content.includes('text-blue-')) return 'blue';
  if (content.includes('text-purple-')) return 'purple';
  if (content.includes('text-indigo-')) return 'indigo';
  if (content.includes('text-red-')) return 'red';
  if (content.includes('text-yellow-')) return 'yellow';
  if (content.includes('text-pink-')) return 'pink';
  if (content.includes('text-gray-')) return 'gray';
  return 'blue'; // デフォルト
}

/**
 * 単一ファイルを処理
 */
function processFile(filePath) {
  console.log(\\`Processing: \\${filePath}\\`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 既にモーダル実装済みかチェック
    if (content.includes('BlogModal') && content.includes('data-article-id')) {
      console.log(\\`  ✅ Already implemented: \\${filePath}\\`);
      return;
    }
    
    const pageInfo = parsePageInfo(content, filePath);
    const themeColor = guessThemeColor(content);
    
    let updatedContent = content;
    
    // 1. BlogModalのimportを追加
    updatedContent = addBlogModalImport(updatedContent);
    
    // 2. 記事データを追加
    updatedContent = addOrUpdateArticlesData(updatedContent, pageInfo.cityName);
    
    // 3. 記事カードをモーダル対応に変更
    updatedContent = convertArticleCardsToModal(
      updatedContent, 
      themeColor, 
      pageInfo.prefectureSlug, 
      pageInfo.citySlug
    );
    
    // 4. モーダルコンポーネントを追加
    updatedContent = addModalComponents(
      updatedContent, 
      pageInfo.cityName, 
      pageInfo.prefectureName
    );
    
    // ファイルを保存
    fs.writeFileSync(filePath, updatedContent);
    console.log(\\`  ✅ Updated: \\${filePath}\\`);
    
  } catch (error) {
    console.error(\\`  ❌ Error processing \\${filePath}:`, error.message);
  }
}

/**
 * ディレクトリを再帰的に処理
 */
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // ディレクトリの場合は再帰処理
      processDirectory(fullPath);
    } else if (entry.name === 'index.astro' && !SKIP_DIRS.includes(entry.name)) {
      // index.astroファイルの場合は処理
      processFile(fullPath);
    }
  }
}

/**
 * メイン実行
 */
function main() {
  console.log('🚀 Starting blog pages modal implementation...');
  
  const blogPagesPath = path.join(process.cwd(), BLOG_PAGES_DIR);
  
  if (!fs.existsSync(blogPagesPath)) {
    console.error(\\`❌ Blog pages directory not found: \\${blogPagesPath}\\`);
    process.exit(1);
  }
  
  processDirectory(blogPagesPath);
  
  console.log('\\n✅ Blog pages modal implementation completed!');
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = {
  processFile,
  processDirectory,
  parsePageInfo,
  addBlogModalImport,
  addOrUpdateArticlesData,
  convertArticleCardsToModal,
  addModalComponents
};