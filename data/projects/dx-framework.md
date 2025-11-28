# DirectX フレームワーク

**今年の進級制作展（就活）作品を制作するためのフレームワークとして準備している作品になります。**

**描画まわりについてこだわりたいと思っているので、実現できるような実践的内容を実装しています。**

## プロジェクト概要

本フレームワークは、次世代のゲームエンジン技術を目指して、以下の先進的な機能を実装しています

- **カスタムレンダリングパイプライン**: 拡張可能なレンダーパスシステム
- **ShaderVariants活用**: 多様なマテリアル表現の実現
- **物理演算エンジン統合**: Jolt Physicsによる高性能物理シミュレーション
- **仮想ジオメトリシステム**: 次世代レンダリング技術の実装（開発中）
- **最適化された頂点データ管理**: メモリ効率を重視したデータ構造

---

## レンダリングパイプライン


### 大気シミュレーション
シェーダー内でRayleigh散乱とMie散乱を計算し、時間帯に応じた色変化を表現しています。
寄与する割合の高い一次散乱のみをレイマーチで計算し、全体の15%ほどの多重散乱は近似計算で表現しています。
[video:videos/DirectXFrameWork.mp4]
![大気シミュレーション](images/atmosphereTexture.png)

![大気シミュレーション2](images/SkyboxRead.png)


---

### カスタムレンダーパスアーキテクチャ

本フレームワークでは、**拡張可能なレンダーパスシステム**を採用しています。各レンダリングステージを独立したパスとして実装することで、柔軟な描画処理を実現しています。

![レンダーパス構造](images/RenderPassArchitecture.png)

#### レンダーパスの種類

1. **ClearRenderPass** - レンダーターゲットのクリア
2. **OpaqueRenderPass** - 不透明オブジェクトの描画
3. **SkyboxRenderPass** - スカイボックスの描画
4. **TransparentRenderPass** - 半透明オブジェクトの描画
5. **PostProcessRenderPass** - ポストプロセス効果

各パスは`RenderPassEvent`で実行タイミングを制御し、前処理・後処理を柔軟に挿入できます。

```cpp
enum class RenderPassEvent {
    BeforeRendering,
    BeforeRenderingOpaques,
    AfterRenderingOpaques,
    BeforeRenderingSkybox,
    AfterRenderingSkybox,
    BeforeRenderingTransparents,
    AfterRenderingTransparents,
    BeforeRenderingPostProcessing,
    AfterRenderingPostProcessing,
    AfterRendering
};
```

---


## 頂点圧縮について

### 圧縮方式について

法線についてはOctahedronEncoding（[参考サイト](https://knarkowicz.wordpress.com/2014/04/16/octahedron-normal-vector-encoding/)）を使用しており、もとの12バイトから4バイトまで圧縮を成功しています。

**圧縮アルゴリズムの特徴：**
- Float3（12バイト）→ UInt16x2（4バイト）
- 精度の損失を最小限に抑制
- デコード処理の高速化

![圧縮方式1](images/Normal1.png)
![圧縮方式2](images/Normal2.png)

### 法線デコード処理

頂点圧縮で格納した法線ベクトルをデコードするシェーダーコード例です。16bit整数から-1～1の範囲に変換し、八面体マッピングで復元しています。

![法線デコードシェーダー](images/Decode.png)

### 頂点のレイアウトについて

最適化された頂点レイアウトを採用し、GPUキャッシュヒット率の向上を図っています。

![頂点レイアウト](images/Layout.png)

## 圧縮プログラムのダウンロード

下記の画像で使用しているモデルの頂点数は 9036個、一個当たり38バイトで合計約335.3KBとなります。

圧縮後の頂点は一個当たり20バイトで合計約176.4KBまで圧縮できています。

**圧縮率: 約47%のメモリ削減を達成**

![頂点圧縮モデル](images/ConpModel.png)

頂点圧縮のサンプルプログラムは下記よりダウンロードできます：

[Google Drive](https://drive.google.com/drive/folders/1KpQY3D3uRsKXaaPuWcbWdjbdqgczFl_o?usp=drive_link)
[GitHub](https://github.com/Hatakeyama20528/PMD_Export)
---

## 物理演算システム

### Jolt Physics統合

本フレームワークでは、**Jolt Physics**エンジンを統合し、高性能な物理シミュレーションを実現しています。

**主な機能：**
- **リジッドボディシミュレーション**: 動的・静的・キネマティックオブジェクトのサポート
- **衝突検出**: BroadPhaseとNarrowPhaseの最適化

![物理演算システム](images/PhysicsIntegration.png)

### 物理コンポーネントアーキテクチャ

エンティティコンポーネントシステム（ECS）パターンを採用し、ゲームオブジェクトに物理挙動を柔軟に追加できます。

```cpp
// RigidBodyコンポーネントの例
class RigidBodyComponent {
    JPH::BodyID bodyID;
    float mass;
    Vec3 centerOfMass;
    EMotionType motionType; // Static, Kinematic, Dynamic
};
```

---

## 画像処理について

**コンピュートシェーダー**を活用した高度な画像処理を実装しています。

**実装済みフィルター：**
- **ガウシアンフィルタ**: ブラー効果
- **ソーベルフィルタ**: エッジ検出
- **シンプレックスノイズ**: プロシージャルテクスチャ生成

![画像処理テスト](images/TextureTest.png)

---

## シェーダーについて


### ディファードレンダリング用Gバッファ書き出し

Gバッファへの書き出しを行うピクセルシェーダーの一部です。アルベド、深度、法線、マテリアル情報をそれぞれのターゲットに出力しています。

![Gバッファ書き出しシェーダー](images/GBuff.png)

![Gバッファ構造](images/GBuffer02.png)

### こだわったマテリアル表現

UnityのShaderVariantを参考に、基本レンダリングShaderを開発しています。
PBRマテリアルに対応し、メタリック・ラフネス・法線マップ、エミッションなど多様なテクスチャをサポートしています。
これらのテクスチャはShaderVariantで**CPU側からキーワード形式で切り替え可能です。**

![マテリアルシェーダー1](images/PBR_PS.png)
![マテリアルシェーダー2](images/PBR_Render.png)

---

## 雨粒のポストプロセス

雨粒エフェクトをポストプロセスとして実装しました。
既に書いてある物が雨粒で歪むなど細部にこだわっています。
[video:videos/RainEffect.mp4]
![雨粒エフェクト](images/RainDropEffect.png)

---

## 仮想ジオメトリシステム（開発中）

次世代のレンダリング技術として、**仮想ジオメトリシステム**の実装を進めています。

**目標**
- 10億ポリゴンの描画
- 自動LOD管理
- メモリ効率の最適化

詳細は [仮想ジオメトリページ](project-template.html?project=virtual-geometry) をご覧ください。

---

## 今後の開発予定

- 仮想ジオメトリシステム
- 動的グローバルイルミネーション