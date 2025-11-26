# ポートフォリオサイト - 畠山 岳

## 概要

このポートフォリオサイトは、ゲーム開発・グラフィックスプログラミングのプロジェクトを紹介するためのWebサイトです。

## 主な機能

- **プロジェクトスライダー**: ヒーローセクションでのプロジェクト紹介
- **プロジェクトカード**: グリッド表示でのプロジェクト一覧
- **技術トピック**: 技術カテゴリごとの整理と詳細ページ
- **Markdown対応**: プロジェクト詳細をMarkdownファイルで管理可能
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **画像拡大機能**: クリックで画像を拡大表示

## 技術トピック

各技術分野をカテゴリ化し、関連プロジェクトとともに紹介しています：

### 1. レンダリング技術
- ディファードレンダリング、PBR、頂点圧縮などの先進的なグラフィックス技術
- 関連プロジェクト: DirectX フレームワーク、PBR & レイトレーシング

### 2. 物理演算
- Jolt Physicsを使用した高性能なリジッドボディシミュレーションと衝突検出
- 関連プロジェクト: DirectX フレームワーク

### 3. 仮想ジオメトリ
- 次世代レンダリング技術。メッシュクラスタリングとGPU駆動型レンダリング
- 関連プロジェクト: 仮想ジオメトリシステム

### 4. シェーダーエフェクト
- カスタムシェーダーによる高度なビジュアルエフェクトとポストプロセス
- 関連プロジェクト: Shadow Collision、DirectX フレームワーク

### 5. プロシージャル生成
- ノイズ関数を使用したテクスチャ生成とプロシージャルコンテンツ
- 関連プロジェクト: DirectX フレームワーク

### 6. UI・入力システム
- DirectWriteによるテキスト描画とコントローラー対応
- 関連プロジェクト: Rotate Carry、DirectX フレームワーク

## プロジェクト一覧

### 1. DirectX フレームワーク
- **技術**: DirectX11, ディファードレンダリング, 頂点圧縮, Jolt Physics
- **特徴**: カスタムレンダーパスシステム、PBRマテリアル、物理演算統合

### 2. 仮想ジオメトリシステム（開発中）
- **技術**: DirectX11, Compute Shader, GPU駆動型レンダリング
- **特徴**: 自動LOD管理、メッシュクラスタリング、数百万ポリゴンの効率的描画

### 3. Shadow Collision
- **技術**: Unity 2022.3.61, カスタムシェーダー
- **特徴**: 光と影のギミック、ソーベルフィルター、2D/3Dフェーズ切り替え

### 4. Rotate Carry
- **技術**: DirectX11, DirectWrite, コントローラ対応
- **特徴**: 落ちものパズルゲーム、3Dスカイドーム

### 5. PBR & レイトレーシング
- **技術**: DirectX12 DXR
- **特徴**: レイトレーシング、物理ベースレンダリング

## ファイル構成

```
Hatakeyama20528.github.io/
│
├── index.html                      # トップページ
├── project-template.html           # プロジェクト詳細ページ
├── topic-detail.html               # トピック詳細ページ（新規）
│
├── js/
│   ├── main.js                    # トップページのメインスクリプト
│   ├── project-detail.js          # プロジェクト詳細ページのスクリプト
│   └── topic-detail.js            # トピック詳細ページのスクリプト（新規）
│
├── data/
│   ├── projects.json              # プロジェクトデータ（新形式）
│   ├── topics.json                # トピックデータ（新規）
│   ├── projects-legacy.json       # レガシープロジェクトデータ（後方互換性用）
│   │
│   └── projects/
│       ├── dx-framework.md        # DirectXフレームワークの詳細（Markdown）
│       ├── virtual-geometry.md    # 仮想ジオメトリシステムの詳細（Markdown）
│       ├── shadow-collision.md    # Shadow Collisionの詳細（Markdown）
│       ├── rotate-carry.md        # Rotate Carryの詳細（Markdown）
│       └── pbr-raytracing.md      # PBR & レイトレーシングの詳細（Markdown）
│
├── images/                         # 画像ファイル
│   └── topics/                    # トピック用画像（新規）
│       ├── rendering-topic.png
│       ├── physics-topic.png
│       ├── virtual-geometry-topic.png
│       ├── shader-topic.png
│       ├── procedural-topic.png
│       └── ui-topic.png
├── videos/                         # 動画ファイル
│
└── README.md                       # このファイル
```

## 技術スタック

### ライブラリ
- **AOS (Animate On Scroll)**: スクロールアニメーション
- **marked.js**: Markdownパーサー
- **Tailwind CSS**: CSSフレームワーク

### アーキテクチャパターン
- **クラスベース設計**: `HeroSlider`, `ProjectManager`, `TopicManager`, `MarkdownRenderer`
- **モジュール分離**: 関心の分離によるメンテナンス性向上
- **データ駆動型**: JSONとMarkdownによるコンテンツ管理

## サイト構造

```
ホームページ (index.html)
├── 技術トピック セクション
│   └── トピックカード → topic-detail.html?topic={id}
│       └── 関連プロジェクト一覧
├── プロジェクト セクション
│   └── プロジェクトカード → project-template.html?project={id}
└── About セクション
```

## 使用ライブラリ

- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [AOS](https://michalsnik.github.io/aos/) - スクロールアニメーション
- [marked.js](https://marked.js.org/) - Markdownパーサー

## 連絡先

hatakeyama20528@gmail.com
