# Claude Code 設定

## 通知設定
以下のタイミングで5回の通知音を鳴らす：
- 作業完了時
- ユーザーに選択肢を尋ねるとき

通知音コマンド：
```bash
for i in {1..5}; do powershell.exe -c "[console]::beep(800,500)"; sleep 1; done
```

## 重要な実装指針

### 必須事項
- 何も要求されていないことは行わない
- 絶対に必要でない限り、新しいファイルを作成しない
- 常に既存ファイルの編集を新規作成より優先する
- ユーザーが明確に要求しない限り、ドキュメントファイル（*.md）やREADMEファイルを積極的に作成しない

## 市区町村ページの正しい構造

### 正しい形式の参照ページ
**URL**: https://kasaman04.github.io/ja/blog/osaka/osaka/

### 必須の構造（すべての市区町村ページに適用）
`/ja/blog/[prefecture]/[city]/index.astro` のすべてのページは以下の構造にする：

1. **ページ構成**:
   - Hero Section（市区町村名、説明、基本データ）
   - Quick Stats（面積、世帯数、駅数、病院数）
   - Articles Section（カテゴリ別記事リスト）
   - CTA Section

2. **記事リスト形式**:
   - カテゴリ別にグループ化（地域情報、生活基盤、コスト、その他など）
   - 縦並びリスト形式
   - 各記事：サムネイル画像、タイトル、カテゴリバッジ、説明文
   - 「完全版記事を読む」と「詳細調査を依頼」のボタン

3. **禁止事項**:
   - CityModalコンポーネントの使用禁止
   - 6つのカード形式のレイアウト禁止
   - モーダルポップアップでの記事表示禁止

### テンプレート構造
```astro
---
import BaseLayout from '../../../../../layouts/BaseLayout.astro';
// CityModalのimportは禁止
---

<BaseLayout {title} {description} {lang}>
  <!-- Breadcrumb -->
  <!-- Hero Section -->
  <!-- Quick Stats -->
  
  <!-- Articles Section -->
  <section class="py-16 bg-gray-50">
    <!-- カテゴリ別の記事リスト -->
    <div class="mb-16">
      <div class="flex items-center mb-8">
        <span class="text-3xl mr-4">🌍</span>
        <h3 class="text-2xl font-bold text-gray-900">地域情報</h3>
      </div>
      
      <div class="space-y-6">
        <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="md:flex">
            <div class="md:w-1/3">
              <img src="..." class="w-full h-48 md:h-full object-cover" />
            </div>
            <div class="md:w-2/3 p-6">
              <!-- 記事内容 -->
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
</BaseLayout>

<!-- CityModalコンポーネントの使用禁止 -->
```

### 重要な注意事項
- **既存の市区町村ページの修正**: 現在CityModalを使用している全てのページを上記構造に変更
- **新規市区町村ページの作成**: 必ず上記構造を使用
- **ビルドエラー回避**: CityModalコンポーネントは完全に削除