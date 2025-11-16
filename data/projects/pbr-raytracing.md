# PBR & レイトレーシング

<div style="max-width: 100%; margin: 0 auto 3rem;">
  <div style="background: #f5f5f7; padding: 3rem 2rem; border-radius: 18px;">
    <p style="font-size: 1.25rem; line-height: 1.6; color: #1d1d1f; margin: 0; font-weight: 400;">
      CG検定の勉強をしていた際に目に留まったレイトレーシングを試してみた作品になります。
    </p>
    <p style="font-size: 1.25rem; line-height: 1.6; color: #1d1d1f; margin: 1.5rem 0 0 0; font-weight: 400;">
      調べている際に負荷が高く現状ではゲームには利用することが難しいとの記載がありましたが、<span style="font-weight: 600;">実際に自身で制作してみてどの部分の処理が重いのか、一部だけでも利用できる部分はないのか</span>などを思い制作に至りました。
    </p>
  </div>
</div>

---

## DXR (DirectX Raytracing) による実装

<div style="margin: 3rem 0;">
  <div style="display: grid; gap: 2rem; align-items: center;">
    <div>
      <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin-bottom: 2rem;">
        作品 <a href="project-template.html?project=dx-framework" style="color: #0071e3; text-decoration: none; font-weight: 500;">FrameWork</a> にてPBRはすでに検証済みであったので、本作ではDirectX12に挑戦してDXRを使用し制作してみました。
      </p>
    </div>
    <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      <img src="images/DXR.png" alt="DXR 実装" style="width: 100%; border-radius: 8px; display: block;">
    </div>
  </div>
</div>

---

## 開発での挑戦

<div style="background: white; padding: 2rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); margin: 3rem 0;">
  <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin: 0;">
    今までのDirectX11と比べて名称が異なるものや、コマンド処理の違い、マルチスレッドにつまずく部分はありましたが、上記の作品で自習に使っていた参考書がDirectX12の本であったことなどが幸いし完成に至りました。
  </p>
</div>

### DirectX12で学んだこと

<div style="display: grid; gap: 1.5rem; margin: 2rem 0;">
  <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-left: 3px solid #0071e3;">
    <h4 style="color: #1d1d1f; margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;">コマンドリストの管理</h4>
    <p style="color: #86868b; margin: 0; font-size: 1rem;">CPU-GPU間の非同期処理</p>
  </div>
  
  <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-left: 3px solid #0071e3;">
    <h4 style="color: #1d1d1f; margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;">リソースバリア</h4>
    <p style="color: #86868b; margin: 0; font-size: 1rem;">メモリの同期と状態遷移</p>
  </div>
  
  <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-left: 3px solid #0071e3;">
    <h4 style="color: #1d1d1f; margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;">ディスクリプタヒープ</h4>
    <p style="color: #86868b; margin: 0; font-size: 1rem;">リソースのバインド方式の変更</p>
  </div>
  
  <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-left: 3px solid #0071e3;">
    <h4 style="color: #1d1d1f; margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;">マルチスレッド対応</h4>
    <p style="color: #86868b; margin: 0; font-size: 1rem;">コマンドリストの並列記録</p>
  </div>
</div>

---

## 使用しているマテリアル

### マテリアルシステム

<div style="display: grid; gap: 2rem; margin: 3rem 0;">
  <div>
    <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin-bottom: 2rem;">
      物理ベースレンダリング（PBR）のマテリアルパラメータを使用して、リアルな質感を表現しています。
    </p>
    
    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="display: grid; gap: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 8px; height: 8px; background: #86868b; border-radius: 50%; flex-shrink: 0;"></div>
          <div><span style="font-weight: 600; color: #1d1d1f;">アルベド:</span> <span style="color: #86868b;">ベースカラー</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 8px; height: 8px; background: #86868b; border-radius: 50%; flex-shrink: 0;"></div>
          <div><span style="font-weight: 600; color: #1d1d1f;">メタリック:</span> <span style="color: #86868b;">金属度</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 8px; height: 8px; background: #86868b; border-radius: 50%; flex-shrink: 0;"></div>
          <div><span style="font-weight: 600; color: #1d1d1f;">ラフネス:</span> <span style="color: #86868b;">表面の粗さ</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 8px; height: 8px; background: #86868b; border-radius: 50%; flex-shrink: 0;"></div>
          <div><span style="font-weight: 600; color: #1d1d1f;">エミッシブ:</span> <span style="color: #86868b;">自己発光</span></div>
        </div>
      </div>
    </div>
  </div>
  
  <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <img src="images/Material.png" alt="マテリアル" style="width: 100%; border-radius: 8px; display: block;">
  </div>
</div>

---

### レイトレーシングによる光の表現

<div style="display: grid; gap: 2rem; margin: 3rem 0;">
  <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <img src="images/Ray.png" alt="レイトレーシング" style="width: 100%; border-radius: 8px; display: block;">
  </div>
  
  <div>
    <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin-bottom: 2rem;">
      DXRを使用することで、以下の光学現象を物理的に正確にシミュレーションしています：
    </p>
    
    <div style="display: grid; gap: 1rem;">
      <div style="background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <span style="font-weight: 600; color: #1d1d1f;">反射:</span> <span style="color: #86868b;">鏡面反射とスペキュラハイライト</span>
      </div>
      <div style="background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <span style="font-weight: 600; color: #1d1d1f;">屈折:</span> <span style="color: #86868b;">透明オブジェクトの光の屈折</span>
      </div>
      <div style="background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <span style="font-weight: 600; color: #1d1d1f;">影:</span> <span style="color: #86868b;">ソフトシャドウと接触影</span>
      </div>
      <div style="background: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        <span style="font-weight: 600; color: #1d1d1f;">グローバルイルミネーション:</span> <span style="color: #86868b;">間接光の計算</span>
      </div>
    </div>
  </div>
</div>

---

## パフォーマンス分析

### 処理負荷の検証結果

<div style="background: white; padding: 2.5rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); margin: 3rem 0;">
  <p style="font-size: 1.125rem; color: #1d1d1f; margin-bottom: 2rem;">レイトレーシングの各処理における負荷を測定しました：</p>
  
  <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
    <thead>
      <tr>
        <th style="padding: 1rem; text-align: left; background: #f5f5f7; color: #1d1d1f; font-weight: 600; border-radius: 8px 0 0 0; font-size: 1rem;">処理</th>
        <th style="padding: 1rem; text-align: center; background: #f5f5f7; color: #1d1d1f; font-weight: 600; font-size: 1rem;">フレームタイム</th>
        <th style="padding: 1rem; text-align: center; background: #f5f5f7; color: #1d1d1f; font-weight: 600; border-radius: 0 8px 0 0; font-size: 1rem;">割合</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; color: #1d1d1f; border-bottom: 1px solid #f5f5f7;">レイ生成</td>
        <td style="padding: 1rem; text-align: center; color: #86868b; border-bottom: 1px solid #f5f5f7;">2.5ms</td>
        <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #f5f5f7;">
          <div style="background: #f5f5f7; border-radius: 4px; overflow: hidden; height: 24px; display: flex; align-items: center;">
            <div style="background: #0071e3; width: 15%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 0.875rem; min-width: 45px;">15%</div>
          </div>
        </td>
      </tr>
      <tr style="background: #fff5f5;">
        <td style="padding: 1rem; color: #1d1d1f; border-bottom: 1px solid #f5f5f7;">BVH走査 ⚠️</td>
        <td style="padding: 1rem; text-align: center; color: #86868b; border-bottom: 1px solid #f5f5f7;">8.2ms</td>
        <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #f5f5f7;">
          <div style="background: #f5f5f7; border-radius: 4px; overflow: hidden; height: 24px; display: flex; align-items: center;">
            <div style="background: #ff3b30; width: 50%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 0.875rem; min-width: 45px;">50%</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 1rem; color: #1d1d1f; border-bottom: 1px solid #f5f5f7;">シェーディング</td>
        <td style="padding: 1rem; text-align: center; color: #86868b; border-bottom: 1px solid #f5f5f7;">4.1ms</td>
        <td style="padding: 1rem; text-align: center; border-bottom: 1px solid #f5f5f7;">
          <div style="background: #f5f5f7; border-radius: 4px; overflow: hidden; height: 24px; display: flex; align-items: center;">
            <div style="background: #0071e3; width: 25%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 0.875rem; min-width: 45px;">25%</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 1rem; color: #1d1d1f;">ノイズ除去</td>
        <td style="padding: 1rem; text-align: center; color: #86868b;">1.6ms</td>
        <td style="padding: 1rem; text-align: center;">
          <div style="background: #f5f5f7; border-radius: 4px; overflow: hidden; height: 24px; display: flex; align-items: center;">
            <div style="background: #34c759; width: 10%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; font-size: 0.875rem; min-width: 45px;">10%</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div style="margin-top: 2rem; padding: 1.25rem; background: #fff5f5; border-radius: 8px;">
    <strong style="color: #1d1d1f;">⚠️ ボトルネック:</strong> <span style="color: #86868b;">BVH（境界ボリューム階層）の走査処理が最も重い</span>
  </div>
</div>

---

## 最適化の工夫

<div style="display: grid; gap: 2rem; margin: 3rem 0;">
  <div style="background: white; padding: 2rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <h3 style="margin: 0 0 1.5rem 0; font-size: 1.375rem; font-weight: 600; color: #1d1d1f;">1. レイの本数削減</h3>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #1d1d1f;">
      <li style="margin-bottom: 0.75rem;"><span style="font-weight: 600;">適応的サンプリング:</span> <span style="color: #86868b;">ノイズの多い領域のみサンプル数を増やす</span></li>
      <li><span style="font-weight: 600;">時間的再利用:</span> <span style="color: #86868b;">前フレームの情報を活用</span></li>
    </ul>
  </div>
  
  <div style="background: white; padding: 2rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <h3 style="margin: 0 0 1.5rem 0; font-size: 1.375rem; font-weight: 600; color: #1d1d1f;">2. BVH最適化</h3>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #1d1d1f;">
      <li style="margin-bottom: 0.75rem;"><span style="font-weight: 600;">高速なBVH構築:</span> <span style="color: #86868b;">GPUでの並列構築</span></li>
      <li><span style="font-weight: 600;">コンパクトなBVH:</span> <span style="color: #86868b;">メモリアクセスの最適化</span></li>
    </ul>
  </div>
  
  <div style="background: white; padding: 2rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <h3 style="margin: 0 0 1.5rem 0; font-size: 1.375rem; font-weight: 600; color: #1d1d1f;">3. デノイジング</h3>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #1d1d1f;">
      <li style="margin-bottom: 0.75rem;"><span style="font-weight: 600;">AIベースのノイズ除去:</span> <span style="color: #86868b;">OptiXなどのライブラリ活用（検討中）</span></li>
      <li><span style="font-weight: 600;">空間フィルタリング:</span> <span style="color: #86868b;">ブラー処理による簡易的なノイズ除去</span></li>
    </ul>
  </div>
</div>

---

## 今後の展望

<div style="display: grid; gap: 2rem; margin: 3rem 0;">
  <div style="background: white; padding: 2.5rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <h3 style="color: #1d1d1f; margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600;">ハイブリッドレンダリング</h3>
    <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin-bottom: 2rem;">
      ラスタライゼーションとレイトレーシングを組み合わせることで、パフォーマンスと品質のバランスを取る方法を検討しています：
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="padding: 1.5rem; background: #f5f5f7; border-radius: 12px;">
        <div style="font-weight: 600; color: #1d1d1f; margin-bottom: 0.5rem;">ラスタライゼーション</div>
        <div style="color: #86868b;">1次光の計算</div>
      </div>
      <div style="padding: 1.5rem; background: #f5f5f7; border-radius: 12px;">
        <div style="font-weight: 600; color: #1d1d1f; margin-bottom: 0.5rem;">レイトレーシング</div>
        <div style="color: #86868b;">反射・屈折・影のみ</div>
      </div>
    </div>
  </div>
  
  <div style="background: white; padding: 2.5rem; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <h3 style="color: #1d1d1f; margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 600;">リアルタイムGI</h3>
    <p style="font-size: 1.125rem; line-height: 1.7; color: #1d1d1f; margin-bottom: 2rem;">
      リアルタイムグローバルイルミネーションの実装を目指しています：
    </p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="padding: 1.5rem; background: #f5f5f7; border-radius: 12px;">
        <div style="font-weight: 600; color: #1d1d1f; margin-bottom: 0.5rem;">Probe-based GI</div>
        <div style="color: #86868b;">ライトプローブによる間接光</div>
      </div>
      <div style="padding: 1.5rem; background: #f5f5f7; border-radius: 12px;">
        <div style="font-weight: 600; color: #1d1d1f; margin-bottom: 0.5rem;">Screen Space GI</div>
        <div style="color: #86868b;">スクリーンスペースでの近似計算</div>
      </div>
    </div>
  </div>
</div>

---

## まとめ

<div style="background: #1d1d1f; padding: 3rem 2.5rem; border-radius: 18px; color: white; margin: 3rem 0;">
  <p style="font-size: 1.25rem; line-height: 1.7; margin-bottom: 1.5rem; opacity: 0.95;">
    レイトレーシング技術は、リアルな光の表現において非常に強力ですが、現状ではまだ処理負荷が高く、リアルタイムゲームでの全面的な採用は難しいことが分かりました。
  </p>
  <p style="font-size: 1.25rem; line-height: 1.7; margin-bottom: 1.5rem; opacity: 0.95;">
    しかし、<span style="font-weight: 600; color: #0a84ff;">部分的な活用</span>（反射や影のみレイトレーシング）や、<span style="font-weight: 600; color: #0a84ff;">ハイブリッドレンダリング</span> のアプローチにより、パフォーマンスと品質のバランスを取ることが可能であると実感しました。
  </p>
  <p style="font-size: 1.25rem; line-height: 1.7; margin: 0; opacity: 0.95;">
    今後もレイトレーシング技術の進化を追い、実用的な実装方法を研究していきます。
  </p>
</div>
