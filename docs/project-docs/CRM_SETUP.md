# CRM連携設定ガイド

## 概要
Contact フォームから送信された内容を複数のCRMサービスに自動連携する設定方法

## 対応CRMサービス
1. **Webhook URL** (テスト用・汎用)
2. **HubSpot** (マーケティングオートメーション)
3. **Airtable** (データベース)
4. **SendGrid** (メール通知)

## 1. 即座にテスト可能: Webhook URL

### 手順:
1. [webhook.site](https://webhook.site) にアクセス
2. 生成されたユニークURLをコピー
3. `.env.local` の `WEBHOOK_URL` に設定:
   ```
   WEBHOOK_URL=https://webhook.site/#!/12345678-abcd-efgh-ijkl-mnop
   ```
4. フォーム送信後、webhook.siteページでリアルタイムにデータ受信を確認

## 2. HubSpot 設定

### 必要情報:
- Portal ID (HubSpotアカウント設定で確認)
- Form ID (作成したフォームのID)

### 手順:
1. HubSpotアカウントにログイン
2. Marketing > Forms で新しいフォームを作成
3. Portal IDとForm IDを取得
4. `.env.local` に設定:
   ```
   HUBSPOT_PORTAL_ID=1234567
   HUBSPOT_FORM_ID=abcdef-ghijk-lmnop
   ```

## 3. Airtable 設定

### 必要情報:
- API Key (Airtableアカウント設定で生成)
- Base ID (ベースURLから取得)
- Table Name (テーブル名、デフォルト: "Contacts")

### 手順:
1. [Airtable](https://airtable.com) でベースとテーブルを作成
2. 以下のフィールドを作成:
   - Name (Single line text)
   - Email (Email)
   - Service (Single line text)
   - Message (Long text)
   - Submitted (Date)
   - Source (Single line text)
3. API Key を [Account settings](https://airtable.com/account) で生成
4. Base ID をベースURLから取得 (例: app1234567890abcd)
5. `.env.local` に設定:
   ```
   AIRTABLE_API_KEY=pat1234567890abcdef
   AIRTABLE_BASE_ID=app1234567890abcd
   AIRTABLE_TABLE_NAME=Contacts
   ```

## 4. SendGrid 設定

### 必要情報:
- API Key (SendGridで生成)
- 送信元・宛先メールアドレス

### 手順:
1. [SendGrid](https://sendgrid.com) アカウントを作成
2. Settings > API Keys で新しいAPI Keyを生成
3. 送信元ドメインを認証
4. `.env.local` に設定:
   ```
   SENDGRID_API_KEY=SG.1234567890abcdef
   ```
5. `src/pages/api/submit-contact.ts` のメールアドレスを更新:
   ```typescript
   to: [{ email: "your-email@example.com" }]
   from: { email: "noreply@your-domain.com" }
   ```

## テスト方法

### 1. 開発サーバー起動
```bash
npm run dev
```

### 2. フォーム送信テスト
1. http://localhost:4321/contact にアクセス
2. フォームに入力して送信
3. コンソールログでCRM連携結果を確認:
   ```
   ✓ Webhook integration successful
   ✓ HubSpot integration successful
   ✓ Airtable integration successful
   ✓ SendGrid integration successful
   ```

### 3. 各CRMでデータ確認
- **Webhook**: webhook.siteページ
- **HubSpot**: Contacts > Contact database
- **Airtable**: 作成したテーブル
- **SendGrid**: 指定メールアドレスに通知メール

## トラブルシューティング

### よくあるエラー:
1. **API Key Invalid**: キーが正しく設定されているか確認
2. **CORS Error**: APIエンドポイントの設定を確認
3. **Rate Limit**: API呼び出し制限に達していないか確認

### ログの確認:
ブラウザのコンソールまたはサーバーログで詳細なエラー情報を確認してください。

## セキュリティ注意事項
- `.env.local` を`.gitignore`に追加（既に含まれています）
- 本番環境では実際のAPIキーを使用
- APIキーは定期的にローテーション