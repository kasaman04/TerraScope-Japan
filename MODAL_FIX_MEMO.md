# モーダル修正時の注意点メモ

## 修正作業で判明した重要なポイント

### 1. Astroフレームワークの制限
- `---` セクション内の変数は `<script is:inline>` 内で参照できない
- cityDataは必ずJavaScriptセクション内で再定義する必要がある

### 2. HTML構造の重要性
- **必須**: `</section>` タグの閉じ忘れがモーダル機能を破壊する
- 特に以下の構造が必要:
```html
<!-- Cities Cards -->
<div>
  <!-- city cards here -->
</div>
</section>  <!-- ←この閉じタグが重要 -->

<!-- Features Section -->
<section>
  <!-- features content -->
</section>

<!-- Call to Action -->
<section>
  <!-- CTA content -->  
</section>

<!-- モーダル -->
<div id="city-modal">
  <!-- modal content -->
</div>
```

### 3. cityDataの実装手順
1. Astroテンプレート部分で表示される都市を確認
2. `Object.entries(prefectureCities).map()` 内の都市名をチェック
3. JavaScript セクションで同じキーの cityData を実装
4. 見落としがないよう全都市を確認

### 4. よくある間違い
- ❌ Astroセクションの都市と JavaScript の cityData のキーが不一致
- ❌ `</section>` タグの閉じ忘れ
- ❌ モーダルが `</BaseLayout>` より後に配置されている
- ❌ `onclick={openCityModal('${key}')}`の引用符エスケープミス

### 5. 修正確認項目
- [ ] 全都市のモーダルが開くか
- [ ] モーダル内容が正しく表示されるか  
- [ ] HTML構造が正しく閉じられているか
- [ ] JavaScript エラーがないか（ブラウザコンソール確認）

### 6. デバッグ方法
- ブラウザのコンソールで `cityData` オブジェクトを確認
- `openCityModal('cityKey')` を直接実行してテスト
- HTML要素の配置を検証ツールで確認

### 7. 県別の特徴
- 各県で都市数が異なる（4-6都市）
- 県ごとに色テーマが設定されている
- 同じパターンで実装すれば問題なし

## 作業効率化のコツ
1. まず1県を完全に修正してパターンを確立
2. 同じパターンを他県に適用
3. 都市リストは必ずAstroテンプレートから抽出
4. 一度に複数県を修正せず、1県ずつ確認