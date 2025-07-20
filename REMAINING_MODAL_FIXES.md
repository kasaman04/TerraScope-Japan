# 残りのモーダル修正が必要な県リスト

## 🔴 修正が必要な県（3県）

### 1. 愛媛県 (Ehime) - /src/pages/ja/blog/ehime/index.astro
**問題**: ダミーデータのまま
```javascript
// 現在の状態
cityData = { 
  dummy: { 
    title: "準備中", 
    features: "準備中" 
  } 
}
```

**修正手順**:
1. Astroフロントマター部分で定義されている都市を確認
2. 各都市の詳細データを cityData オブジェクトに実装
3. 必要フィールド: title, population, foreignPopulation, features, description, image, tags, englishHospital, airport, rent, recommend, pageUrl

### 2. 福井県 (Fukui) - /src/pages/ja/blog/fukui/index.astro  
**問題**: ダミーデータのまま
```javascript
// 現在の状態
cityData = { 
  dummy: { 
    title: "準備中", 
    features: "準備中" 
  } 
}
```

**修正手順**: 愛媛県と同様

### 3. 岐阜県 (Gifu) - /src/pages/ja/blog/gifu/index.astro
**問題**: ダミーデータのまま  
```javascript
// 現在の状態
cityData = { 
  dummy: { 
    title: "準備中", 
    features: "準備中" 
  } 
}
```

**修正手順**: 愛媛県と同様

## ✅ 正常に動作している県（7県）
1. 北海道 (Hokkaido) ✅
2. 東京都 (Tokyo) ✅
3. 大阪府 (Osaka) ✅  
4. 鹿児島県 (Kagoshima) ✅
5. 青森県 (Aomori) ✅
6. 千葉県 (Chiba) ✅
7. 福岡県 (Fukuoka) ✅

## 🟢 最近修正完了した県（8県）
1. 山形県 (Yamagata) - 4都市実装済み
2. 秋田県 (Akita) - 6都市実装済み
3. 岩手県 (Iwate) - 6都市実装済み
4. 宮城県 (Miyagi) - 6都市実装済み
5. 茨城県 (Ibaraki) - 4都市実装済み
6. 京都府 (Kyoto) - 5都市実装済み
7. 兵庫県 (Hyogo) - 5都市実装済み
8. 埼玉県 (Saitama) - 5都市実装済み

## 次の作業指示（Claude Code向け）

### 優先修正対象: 3県のダミーデータ修正

**作業手順**:
1. 各県のindex.astroファイルを開く
2. Astroフロントマター（`---`セクション）で定義されている都市リストを確認
3. `<script is:inline>`内のcityDataを以下の形式で実装:

```javascript
const cityData = {
  cityKey1: {
    title: "都市名",
    population: "約XX万人", 
    foreignPopulation: "約XXX人（X.X%）",
    features: "特徴1・特徴2・特徴3",
    description: "都市の説明文",
    image: "画像URL",
    tags: ["タグ1", "タグ2", "タグ3"],
    englishHospital: "あり/限定的/なし",
    airport: "◎/○/△（空港名）",
    rent: "高い/普通/安い/非常に安い", 
    recommend: "おすすめ対象者",
    pageUrl: "/ja/blog/prefecture/city/"
  }
  // 他の都市も同様に...
};
```

### 確認方法:
1. 各都市カードをクリックしてモーダルが開くか
2. モーダル内容が正しく表示されるか
3. ブラウザコンソールにエラーがないか

### 完了条件:
すべての県でモーダルが正常に機能し、ダミーデータが実際の都市データに置き換わっていること。

## 進捗状況
- **総県数**: 47都道府県
- **確認済み**: 18県
- **正常動作**: 15県 (83.3%)
- **要修正**: 3県 (16.7%)
- **未確認**: 29県

**最終目標**: 全47都道府県でモーダル機能100%動作