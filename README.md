# ポートフォリオサイト - 畠山 岳

## 概要

このポートフォリオサイトは、ゲーム開発・グラフィックスプログラミングのプロジェクトを紹介するためのWebサイトです。

## 主な機能

- **プロジェクトスライダー**: ヒーローセクションでのプロジェクト紹介
- **プロジェクトカード**: グリッド表示でのプロジェクト一覧
- **Markdown対応**: プロジェクト詳細をMarkdownファイルで管理可能
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップに対応
- **画像拡大機能**: クリックで画像を拡大表示

## ファイル構成

```
Hatakeyama20528.github.io/
│
├── index.html                      # トップページ
├── project-template.html           # プロジェクト詳細ページ
│
├── js/
│   ├── main.js                    # トップページのメインスクリプト
│   └── project-detail.js          # プロジェクト詳細ページのスクリプト
│
├── data/
│   ├── projects.json              # プロジェクトデータ（新形式）
│   ├── projects-legacy.json       # レガシープロジェクトデータ（後方互換性用）
│   │
│   └── projects/
│       ├── dx-framework.md        # DirectXフレームワークの詳細（Markdown）
│       ├── shadow-collision.md    # Shadow Collisionの詳細（Markdown）
│       ├── rotate-carry.md        # Rotate Carryの詳細（Markdown）
│       └── pbr-raytracing.md      # PBR & レイトレーシングの詳細（Markdown）
│
├── images/                         # 画像ファイル
├── videos/                         # 動画ファイル
│
└── README.md                       # このファイル
```

## プロジェクトの追加方法

### 1. Markdown形式で追加（推奨）

#### ステップ1: プロジェクトデータを追加

`data/projects.json` にプロジェクト情報を追加します：

```json
{
    "id": "new-project",
    "title": "新しいプロジェクト",
    "image": "images/new-project.png",
    "env": "Unity 2023",
    "period": "2025年4月～",
    "role": "メインプログラマー",
    "teamSize": "5人",
    "descriptionFile": "data/projects/new-project.md"
}
```

#### ステップ2: Markdownファイルを作成

`data/projects/new-project.md` を作成してプロジェクトの詳細を記述します：

```markdown
# 新しいプロジェクト

プロジェクトの概要を記述します。

## 技術的な特徴

- 特徴1
- 特徴2

## 実装の詳細

詳細な説明を記述します。

![スクリーンショット](images/screenshot.png)

## 使用技術

- Unity 2023
- C#
```

#### Markdownの書き方

- **見出し**: `#`, `##`, `###` を使用
- **太字**: `**テキスト**`
- **リンク**: `[リンクテキスト](URL)`
- **画像**: `![代替テキスト](画像パス)`
- **動画**: `[video:動画パス]` （カスタム記法）

### 2. レガシー形式で追加（HTML形式）

`data/projects-legacy.json` に直接HTMLを含む形式で追加することも可能です。
詳細は既存のプロジェクトデータを参照してください。

## カスタマイズ

### スライダーの設定変更

`js/main.js` の `CONFIG` オブジェクトで設定を変更できます：

```javascript
const CONFIG = {
    SLIDER_INTERVAL: 5000,          // スライダーの自動切り替え間隔（ミリ秒）
    AOS_DURATION: 800,              // アニメーション時間（ミリ秒）
    AOS_OFFSET: 100,                // アニメーション開始位置（ピクセル）
    PARALLAX_SPEED: 0.5,            // パララックス効果の速度
    PROJECTS_DATA_URL: 'data/projects.json'  // プロジェクトデータのURL
};
```

### スタイルのカスタマイズ

- `index.html` の `<style>` タグ内でCSSをカスタマイズ
- Tailwind CSSのクラスを使用してデザインを調整

## ブラウザ対応

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 使用ライブラリ

- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [AOS](https://michalsnik.github.io/aos/) - スクロールアニメーション
- [marked.js](https://marked.js.org/) - Markdownパーサー

## ライセンス

? 2025 畠山 岳

## 連絡先

hatakeyama20528@gmail.com
