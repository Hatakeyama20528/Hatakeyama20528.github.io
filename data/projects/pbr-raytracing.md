# PBR & レイトレーシング

<div style="padding: 2rem 0; margin-bottom: 2rem;">
  <p style="font-size: 1.1rem; line-height: 1.8;">
    CG検定の勉強をしていた際に目に留まったレイトレーシングを試してみた作品になります。
  </p>
  <p style="font-size: 1.1rem; line-height: 1.8; margin-top: 1rem;">
    調べている際に負荷が高く現状ではゲームには利用することが難しいとの記載がありましたが、<strong>実際に自身で制作してみてどの部分の処理が重いのか、一部だけでも利用できる部分はないのか</strong>などを思い制作に至りました。
  </p>
</div>

---

## DXR (DirectX Raytracing) による実装

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; align-items: center;">
  <div>
    <p style="font-size: 1.05rem; line-height: 1.7;">
      作品 <a href="project-template.html?project=dx-framework" style="color: #0066cc; text-decoration: none;">FrameWork</a> にてPBRはすでに検証済みであったので、本作ではDirectX12に挑戦してDXRを使用し制作してみました。
    </p>
  </div>
  <div>
    <img src="images/DXR.png" alt="DXR 実装" style="width: 100%; border-radius: 8px;">
  </div>
</div>

---

## 開発での挑戦

<p style="font-size: 1.05rem; line-height: 1.7; padding: 1.5rem; background: #f9f9f9; border-radius: 8px; margin: 2rem 0;">
  今までのDirectX11と比べて名称が異なるものや、コマンド処理の違い、マルチスレッドにつまずく部分はありましたが、上記の作品で自習に使っていた参考書がDirectX12の本であったことなどが幸いし完成に至りました。
</p>

### DirectX12で学んだこと

<div style="margin: 2rem 0;">
  <ul style="list-style: none; padding: 0;">
    <li style="padding: 1rem; margin-bottom: 0.75rem; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #0066cc;">
      <strong>コマンドリストの管理:</strong> CPU-GPU間の非同期処理
    </li>
    <li style="padding: 1rem; margin-bottom: 0.75rem; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #0066cc;">
      <strong>リソースバリア:</strong> メモリの同期と状態遷移
    </li>
    <li style="padding: 1rem; margin-bottom: 0.75rem; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #0066cc;">
      <strong>ディスクリプタヒープ:</strong> リソースのバインド方式の変更
    </li>
    <li style="padding: 1rem; background: #f9f9f9; border-radius: 6px; border-left: 4px solid #0066cc;">
      <strong>マルチスレッド対応:</strong> コマンドリストの並列記録
    </li>
  </ul>
</div>

---

## 使用しているマテリアル

### マテリアルシステム

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; align-items: start;">
  <div>
    <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
      物理ベースレンダリング（PBR）のマテリアルパラメータを使用して、リアルな質感を表現しています。
    </p>
    <ul style="line-height: 2;">
      <li><strong>アルベド:</strong> ベースカラー</li>
      <li><strong>メタリック:</strong> 金属度</li>
      <li><strong>ラフネス:</strong> 表面の粗さ</li>
      <li><strong>エミッシブ:</strong> 自己発光</li>
    </ul>
  </div>
  <div>
    <img src="images/Material.png" alt="マテリアル" style="width: 100%; border-radius: 8px;">
  </div>
</div>

---

### レイトレーシングによる光の表現

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; align-items: start;">
  <div>
    <img src="images/Ray.png" alt="レイ" style="width: 100%; border-radius: 8px;">
  </div>
  <div>
    <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
      DXRを使用することで、以下の光学現象を物理的に正確にシミュレーションしています：
    </p>
    <ul style="line-height: 2;">
      <li><strong>反射:</strong> 鏡面反射とスペキュラハイライト</li>
      <li><strong>屈折:</strong> 透明オブジェクトの光の屈折</li>
      <li><strong>影:</strong> ソフトシャドウと接触影</li>
      <li><strong>グローバルイルミネーション:</strong> 間接光の計算</li>
    </ul>
  </div>
</div>

---

## パフォーマンス分析

### 処理負荷の検証結果

<p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
  レイトレーシングの各処理における負荷を測定しました：
</p>

<table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
  <thead>
    <tr style="background: #f0f0f0;">
      <th style="padding: 1rem; text-align: left; border-bottom: 2px solid #ddd;">処理</th>
      <th style="padding: 1rem; text-align: center; border-bottom: 2px solid #ddd;">フレームタイム</th>
      <th style="padding: 1rem; text-align: center; border-bottom: 2px solid #ddd;">割合</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">レイ生成</td>
      <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #eee;">2.5ms</td>
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">
        <div style="background: #e0e0e0; height: 24px; border-radius: 4px; overflow: hidden;">
          <div style="background: #4a90e2; width: 15%; height: 100%; display: flex; align-items: center; padding-left: 8px; color: white; font-size: 0.9rem;">15%</div>
        </div>
      </td>
    </tr>
    <tr style="background: #fff5f5;">
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">BVH走査 ⚠️</td>
      <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #eee;">8.2ms</td>
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">
        <div style="background: #e0e0e0; height: 24px; border-radius: 4px; overflow: hidden;">
          <div style="background: #e74c3c; width: 50%; height: 100%; display: flex; align-items: center; padding-left: 8px; color: white; font-size: 0.9rem;">50%</div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">シェーディング</td>
      <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #eee;">4.1ms</td>
      <td style="padding: 1rem; border-bottom: 1px solid #eee;">
        <div style="background: #e0e0e0; height: 24px; border-radius: 4px; overflow: hidden;">
          <div style="background: #9b59b6; width: 25%; height: 100%; display: flex; align-items: center; padding-left: 8px; color: white; font-size: 0.9rem;">25%</div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 1rem;">ノイズ除去</td>
      <td style="padding: 1rem; text-align: center;">1.6ms</td>
      <td style="padding: 1rem;">
        <div style="background: #e0e0e0; height: 24px; border-radius: 4px; overflow: hidden;">
          <div style="background: #27ae60; width: 10%; height: 100%; display: flex; align-items: center; padding-left: 8px; color: white; font-size: 0.9rem;">10%</div>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<p style="padding: 1rem; background: #fff5f5; border-left: 4px solid #e74c3c; border-radius: 4px; margin: 1.5rem 0;">
  <strong>⚠️ ボトルネック:</strong> BVH（境界ボリューム階層）の走査処理が最も重い
</p>

---

## 最適化の工夫

### 1. レイの本数削減

<ul style="line-height: 1.8;">
  <li><strong>適応的サンプリング:</strong> ノイズの多い領域のみサンプル数を増やす</li>
  <li><strong>時間的再利用:</strong> 前フレームの情報を活用</li>
</ul>

### 2. BVH最適化

<ul style="line-height: 1.8;">
  <li><strong>高速なBVH構築:</strong> GPUでの並列構築</li>
  <li><strong>コンパクトなBVH:</strong> メモリアクセスの最適化</li>
</ul>

### 3. デノイジング

<ul style="line-height: 1.8;">
  <li><strong>AIベースのノイズ除去:</strong> OptiXなどのライブラリ活用（検討中）</li>
  <li><strong>空間フィルタリング:</strong> ブラー処理による簡易的なノイズ除去</li>
</ul>

---

## 今後の展望

### ハイブリッドレンダリング

<p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
  ラスタライゼーションとレイトレーシングを組み合わせることで、パフォーマンスと品質のバランスを取る方法を検討しています：
</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
  <div style="padding: 1.5rem; background: #f9f9f9; border-radius: 8px;">
    <strong style="display: block; margin-bottom: 0.5rem;">ラスタライゼーション</strong>
    <span>1次光の計算</span>
  </div>
  <div style="padding: 1.5rem; background: #f9f9f9; border-radius: 8px;">
    <strong style="display: block; margin-bottom: 0.5rem;">レイトレーシング</strong>
    <span>反射・屈折・影のみ</span>
  </div>
</div>

### リアルタイムGI

<p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
  リアルタイムグローバルイルミネーションの実装を目指しています：
</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
  <div style="padding: 1.5rem; background: #f9f9f9; border-radius: 8px;">
    <strong style="display: block; margin-bottom: 0.5rem;">Probe-based GI</strong>
    <span>ライトプローブによる間接光</span>
  </div>
  <div style="padding: 1.5rem; background: #f9f9f9; border-radius: 8px;">
    <strong style="display: block; margin-bottom: 0.5rem;">Screen Space GI</strong>
    <span>スクリーンスペースでの近似計算</span>
  </div>
</div>

---

## まとめ

<div style="padding: 2rem; background: #f0f0f0; border-radius: 8px; margin: 2rem 0;">
  <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
    レイトレーシング技術は、リアルな光の表現において非常に強力ですが、現状ではまだ処理負荷が高く、リアルタイムゲームでの全面的な採用は難しいことが分かりました。
  </p>
  <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
    しかし、<strong>部分的な活用</strong>（反射や影のみレイトレーシング）や、<strong>ハイブリッドレンダリング</strong> のアプローチにより、パフォーマンスと品質のバランスを取ることが可能であると実感しました。
  </p>
  <p style="font-size: 1.1rem; line-height: 1.8; margin: 0;">
    今後もレイトレーシング技術の進化を追い、実用的な実装方法を研究していきます。
  </p>
</div>
