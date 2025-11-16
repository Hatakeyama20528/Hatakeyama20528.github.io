# PBR & レイトレーシング

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; color: white;">
  <p style="font-size: 1.1rem; line-height: 1.8; margin: 0;">
    CG検定の勉強をしていた際に目に留まったレイトレーシングを試してみた作品になります。
    <br><br>
    調べている際に負荷が高く現状ではゲームには利用することが難しいとの記載がありましたが、<strong>実際に自身で制作してみてどの部分の処理が重いのか、一部だけでも利用できる部分はないのかなどを思い</strong> 制作に至りました。
  </p>
</div>

---

## DXR (DirectX Raytracing) による実装

<div style="display: flex; gap: 2rem; align-items: center; margin: 2rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p style="font-size: 1.05rem; line-height: 1.7;">
      作品 <a href="project-template.html?project=dx-framework" style="color: #3b82f6; font-weight: 600;">FrameWork</a> にてPBRはすでに検証済みであったので、本作ではDirectX12に挑戦してDXRを使用し制作してみました。
    </p>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img src="images/DXR.png" alt="DXR 実装" style="width: 100%; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
  </div>
</div>

---

## 開発での挑戦

<div style="background: linear-gradient(to right, #f3f4f6, #e5e7eb); padding: 1.5rem; border-radius: 0.75rem; border-left: 4px solid #3b82f6; margin: 2rem 0;">
  <p style="margin-bottom: 1rem; font-size: 1.05rem; line-height: 1.7;">
    今までのDirectX11と比べて名称が異なるものや、コマンド処理の違い、マルチスレッドにつまずく部分はありましたが、上記の作品で自習に使っていた参考書がDirectX12の本であったことなどが幸いし完成に至りました。
  </p>
</div>

### DirectX12で学んだこと

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 3px solid #3b82f6;">
    <h4 style="color: #3b82f6; margin-top: 0; font-size: 1.1rem;">コマンドリストの管理</h4>
    <p style="color: #6b7280; margin: 0.5rem 0 0 0;">CPU-GPU間の非同期処理</p>
  </div>
  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 3px solid #8b5cf6;">
    <h4 style="color: #8b5cf6; margin-top: 0; font-size: 1.1rem;">リソースバリア</h4>
    <p style="color: #6b7280; margin: 0.5rem 0 0 0;">メモリの同期と状態遷移</p>
  </div>
  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 3px solid #ec4899;">
    <h4 style="color: #ec4899; margin-top: 0; font-size: 1.1rem;">ディスクリプタヒープ</h4>
    <p style="color: #6b7280; margin: 0.5rem 0 0 0;">リソースのバインド方式の変更</p>
  </div>
  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 3px solid #f59e0b;">
    <h4 style="color: #f59e0b; margin-top: 0; font-size: 1.1rem;">マルチスレッド対応</h4>
    <p style="color: #6b7280; margin: 0.5rem 0 0 0;">コマンドリストの並列記録</p>
  </div>
</div>

---

## 使用しているマテリアル

### マテリアルシステム

<div style="display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">
      物理ベースレンダリング（PBR）のマテリアルパラメータを使用して、リアルな質感を表現しています。
    </p>
    <div style="display: grid; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%;"></div>
        <strong>アルベド:</strong> ベースカラー
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 12px; height: 12px; background: #3b82f6; border-radius: 50%;"></div>
        <strong>メタリック:</strong> 金属度
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></div>
        <strong>ラフネス:</strong> 表面の粗さ
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%;"></div>
        <strong>エミッシブ:</strong> 自己発光
      </div>
    </div>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img src="images/Material.png" alt="マテリアル" style="width: 100%; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
  </div>
</div>

---

### レイトレーシングによる光の表現

<div style="display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <img src="images/Ray.png" alt="レイトレーシング" style="width: 100%; border-radius: 0.75rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
  </div>
  <div style="flex: 1; min-width: 300px;">
    <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
      DXRを使用することで、以下の光学現象を物理的に正確にシミュレーションしています：
    </p>
    <div style="display: grid; gap: 0.75rem;">
      <div style="padding: 0.75rem; background: linear-gradient(135deg, #667eea22 0%, #764ba222 100%); border-radius: 0.5rem; border-left: 3px solid #667eea;">
        <strong style="color: #667eea;">反射:</strong> 鏡面反射とスペキュラハイライト
      </div>
      <div style="padding: 0.75rem; background: linear-gradient(135deg, #f09433 0%, #e6683c 100%); background: linear-gradient(135deg, #f0943322 0%, #e6683c22 100%); border-radius: 0.5rem; border-left: 3px solid #f09433;">
        <strong style="color: #f09433;">屈折:</strong> 透明オブジェクトの光の屈折
      </div>
      <div style="padding: 0.75rem; background: linear-gradient(135deg, #4338ca22 0%, #6366f122 100%); border-radius: 0.5rem; border-left: 3px solid #4338ca;">
        <strong style="color: #4338ca;">影:</strong> ソフトシャドウと接触影
      </div>
      <div style="padding: 0.75rem; background: linear-gradient(135deg, #059669 0%, #10b981 100%); background: linear-gradient(135deg, #05966922 0%, #10b98122 100%); border-radius: 0.5rem; border-left: 3px solid #059669;">
        <strong style="color: #059669;">グローバルイルミネーション:</strong> 間接光の計算
      </div>
    </div>
  </div>
</div>

---

## パフォーマンス分析

### 処理負荷の検証結果

<div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 2rem 0;">
  <p style="font-size: 1.05rem; margin-bottom: 1.5rem;">レイトレーシングの各処理における負荷を測定しました：</p>
  
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <th style="padding: 1rem; text-align: left; border-radius: 0.5rem 0 0 0;">処理</th>
        <th style="padding: 1rem; text-align: center;">フレームタイム</th>
        <th style="padding: 1rem; text-align: center; border-radius: 0 0.5rem 0 0;">割合</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 1rem; font-weight: 500;">レイ生成</td>
        <td style="padding: 1rem; text-align: center;">2.5ms</td>
        <td style="padding: 1rem; text-align: center;">
          <div style="background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
            <div style="background: linear-gradient(to right, #3b82f6, #60a5fa); width: 15%; padding: 0.25rem 0; color: white; font-weight: 600; text-align: center; min-width: 50px;">15%</div>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #e5e7eb; background: #fef2f2;">
        <td style="padding: 1rem; font-weight: 500;">BVH走査 ⚠️</td>
        <td style="padding: 1rem; text-align: center;">8.2ms</td>
        <td style="padding: 1rem; text-align: center;">
          <div style="background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
            <div style="background: linear-gradient(to right, #ef4444, #f87171); width: 50%; padding: 0.25rem 0; color: white; font-weight: 600; text-align: center; min-width: 50px;">50%</div>
          </div>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 1rem; font-weight: 500;">シェーディング</td>
        <td style="padding: 1rem; text-align: center;">4.1ms</td>
        <td style="padding: 1rem; text-align: center;">
          <div style="background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
            <div style="background: linear-gradient(to right, #8b5cf6, #a78bfa); width: 25%; padding: 0.25rem 0; color: white; font-weight: 600; text-align: center; min-width: 50px;">25%</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 1rem; font-weight: 500;">ノイズ除去</td>
        <td style="padding: 1rem; text-align: center;">1.6ms</td>
        <td style="padding: 1rem; text-align: center;">
          <div style="background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
            <div style="background: linear-gradient(to right, #10b981, #34d399); width: 10%; padding: 0.25rem 0; color: white; font-weight: 600; text-align: center; min-width: 50px;">10%</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div style="margin-top: 1.5rem; padding: 1rem; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0.5rem;">
    <strong style="color: #ef4444;">⚠️ ボトルネック:</strong> BVH（境界ボリューム階層）の走査処理が最も重い
  </div>
</div>

---

## 最適化の工夫

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); padding: 1.5rem; border-radius: 1rem; color: white; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);">
    <h3 style="margin-top: 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.5rem;">🎯</span> 1. レイの本数削減
    </h3>
    <ul style="margin: 1rem 0 0 0; padding-left: 1.5rem; line-height: 1.7;">
      <li><strong>適応的サンプリング:</strong> ノイズの多い領域のみサンプル数を増やす</li>
      <li><strong>時間的再利用:</strong> 前フレームの情報を活用</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 1.5rem; border-radius: 1rem; color: white; box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);">
    <h3 style="margin-top: 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.5rem;">⚡</span> 2. BVH最適化
    </h3>
    <ul style="margin: 1rem 0 0 0; padding-left: 1.5rem; line-height: 1.7;">
      <li><strong>高速なBVH構築:</strong> GPUでの並列構築</li>
      <li><strong>コンパクトなBVH:</strong> メモリアクセスの最適化</li>
    </ul>
  </div>
  
  <div style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); padding: 1.5rem; border-radius: 1rem; color: white; box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);">
    <h3 style="margin-top: 0; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.5rem;">✨</span> 3. デノイジング
    </h3>
    <ul style="margin: 1rem 0 0 0; padding-left: 1.5rem; line-height: 1.7;">
      <li><strong>AIベースのノイズ除去:</strong> OptiXなどのライブラリ活用（検討中）</li>
      <li><strong>空間フィルタリング:</strong> ブラー処理による簡易的なノイズ除去</li>
    </ul>
  </div>
  
</div>

---

## 今後の展望

<div style="display: grid; gap: 1.5rem; margin: 2rem 0;">
  
  <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid #3b82f6;">
    <h3 style="color: #3b82f6; margin-top: 0; font-size: 1.4rem;">🔄 ハイブリッドレンダリング</h3>
    <p style="line-height: 1.7; margin-bottom: 1rem;">
      ラスタライゼーションとレイトレーシングを組み合わせることで、パフォーマンスと品質のバランスを取る方法を検討しています：
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div style="padding: 1rem; background: #eff6ff; border-radius: 0.5rem;">
        <strong style="color: #3b82f6;">🖥️ ラスタライゼーション</strong><br>
        <span style="color: #6b7280;">1次光の計算</span>
      </div>
      <div style="padding: 1rem; background: #f0f9ff; border-radius: 0.5rem;">
        <strong style="color: #3b82f6;">✨ レイトレーシング</strong><br>
        <span style="color: #6b7280;">反射・屈折・影のみ</span>
      </div>
    </div>
  </div>
  
  <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid #10b981;">
    <h3 style="color: #10b981; margin-top: 0; font-size: 1.4rem;">💡 リアルタイムGI</h3>
    <p style="line-height: 1.7; margin-bottom: 1rem;">
      リアルタイムグローバルイルミネーションの実装を目指しています：
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div style="padding: 1rem; background: #f0fdf4; border-radius: 0.5rem;">
        <strong style="color: #10b981;">🎯 Probe-based GI</strong><br>
        <span style="color: #6b7280;">ライトプローブによる間接光</span>
      </div>
      <div style="padding: 1rem; background: #ecfdf5; border-radius: 0.5rem;">
        <strong style="color: #10b981;">📱 Screen Space GI</strong><br>
        <span style="color: #6b7280;">スクリーンスペースでの近似計算</span>
      </div>
    </div>
  </div>
  
</div>

---

## まとめ

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 2rem 0; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
  <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
    レイトレーシング技術は、リアルな光の表現において非常に強力ですが、現状ではまだ処理負荷が高く、リアルタイムゲームでの全面的な採用は難しいことが分かりました。
  </p>
  <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
    しかし、<strong style="color: #60a5fa;">部分的な活用</strong>（反射や影のみレイトレーシング）や、<strong style="color: #a78bfa;">ハイブリッドレンダリング</strong> のアプローチにより、パフォーマンスと品質のバランスを取ることが可能であると実感しました。
  </p>
  <p style="font-size: 1.1rem; line-height: 1.8; margin: 0;">
    今後もレイトレーシング技術の進化を追い、実用的な実装方法を研究していきます。
  </p>
</div>
