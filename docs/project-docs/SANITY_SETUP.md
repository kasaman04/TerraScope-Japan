# Sanity CMS セットアップガイド

## 現在の状況
Node.js v18を使用しているため、最新のSanity CLI（v3.56+）をインストールできません。
Sanity v3.56以降は Node.js v20以降を要求します。

## 解決策

### 1. Sanityプロジェクトの作成（ウェブから）
1. https://www.sanity.io/ にアクセス
2. 「Get started」をクリック
3. Googleアカウントでログイン
4. 新しいプロジェクトを作成
5. プロジェクト名：`land-vista-cms`
6. Dataset：`production`
7. Template：`Clean project with no predefined schemas`

### 2. Project IDの取得
プロジェクト作成後、ダッシュボードから以下の情報を取得：
- Project ID（例：`abc123def`）
- Dataset名（通常は`production`）

### 3. 環境変数の設定
`.env`ファイルを以下のように更新：

```
PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
PUBLIC_SANITY_DATASET=production
```

### 4. CORS設定
Sanity管理画面で以下のドメインを許可：
- `http://localhost:4321`
- `https://your-domain.com`（本番環境）

### 5. Studio設定（別途Node.js v20環境で実行）
Node.js v20以降の環境で：
```bash
cd studio
npm install
npm run dev
```

### 6. 動作確認
1. Astroアプリケーションを起動：
```bash
cd land-vista
npm run dev
```
2. http://localhost:4321/services にアクセス
3. Sanityからデータが取得できることを確認

## 作成済みのファイル
- ✅ `/studio/schemas/` - 全スキーマファイル
- ✅ `/src/lib/sanity.ts` - Sanityクライアント
- ✅ `/src/pages/services/index.astro` - Sanity対応済み
- ✅ `/src/components/ServiceCards.astro` - Sanity対応済み
- ✅ `/src/components/PricingTable.astro` - Sanity対応済み

## 次のステップ
1. 実際のProject IDを取得して`.env`を更新
2. Studio（Node.js v20環境）でスキーマを登録
3. Serviceドキュメントを作成
4. 動作確認

## トラブルシューティング

### エラー：「Project ID not found」
- `.env`ファイルのProject IDが正しいか確認
- Sanityプロジェクトが有効か確認

### エラー：「CORS エラー」
- Sanity管理画面でCORS設定を確認
- 許可されたオリジンにローカルホストを追加

### エラー：「Schema not found」
- Studio側でスキーマが正しく登録されているか確認
- Dataset名が一致しているか確認

## --dangerously-skip-permissions について
このフラグは通常、以下の場面で使用：
- 権限チェックをスキップしてSanity CLIを実行
- 開発環境でのテスト時
- CI/CDパイプラインでの自動化

⚠️ **注意**: 本番環境では使用しないでください。