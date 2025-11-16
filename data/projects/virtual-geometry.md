# 仮想ジオメトリシステム

**次世代レンダリング技術への挑戦**

現代のゲームエンジン（Unreal Engine 5のNaniteなど）で採用されている仮想ジオメトリ技術の理解と実装を目指したプロジェクトです。

## プロジェクト概要

従来のレンダリングパイプラインでは、モデルの詳細度（LOD）を手動で管理し、描画負荷を調整していました。しかし、仮想ジオメトリシステムでは、**数百万～数億ポリゴンを自動的に管理**し、画面に表示されるピクセル数に応じて最適な詳細度で描画します。

### 技術的な目標

1. **自動LOD生成**: メッシュクラスタリングによる階層的LOD
2. **ソフトウェアラスタライザー**: GPU上でのクラスタカリング
3. **可視性判定の最適化**: ビュー依存的なクラスタ選択
4. **メモリ効率**: ストリーミングとページング機構

![仮想ジオメトリ概念図](images/VirtualGeometry_Concept.png)

---

## 実装アプローチ

### 1. メッシュクラスタリング

大規模なメッシュを小さな**クラスタ（128三角形程度）**に分割し、階層構造を構築します。

**メッシュクラスタの特徴：**
- クラスタサイズ: 64～128三角形
- 境界ボリューム: AABBまたはOBB
- エラーメトリクス: 簡略化時の誤差情報

```cpp
struct MeshCluster {
    uint32 vertexOffset;
    uint32 triangleOffset;
    uint32 numTriangles;
    Vec3 boundingBoxMin;
    Vec3 boundingBoxMax;
    float lodError; // 親クラスタとの誤差
};
```

![メッシュクラスタリング](images/MeshClustering.png)

### 2. 階層的LOD構造

クラスタを階層的に結合し、**DAG（有向非巡回グラフ）構造**を構築します。

**LOD階層の生成プロセス：**
1. **ベースメッシュ分割**: 元のメッシュをクラスタに分割
2. **簡略化**: 隣接クラスタをマージして上位LODを生成
3. **最適化**: 重複頂点の削除とメモリ圧縮

![LOD階層](images/LODHierarchy.png)

### 3. GPU駆動型レンダリング

**コンピュートシェーダー**を使用して、GPUで可視性判定とクラスタ選択を実行します。

#### クラスタカリングパイプライン

```hlsl
// Phase 1: Frustum Culling
[numthreads(64, 1, 1)]
void FrustumCullingCS(uint3 threadID : SV_DispatchThreadID)
{
    uint clusterIndex = threadID.x;
    MeshCluster cluster = ClusterBuffer[clusterIndex];
    
    // View Frustum Test
    if (IsInsideFrustum(cluster.boundingBoxMin, cluster.boundingBoxMax))
    {
        // Add to visible list
        uint index = VisibleClusters.IncrementCounter();
        VisibleClusters[index] = clusterIndex;
    }
}

// Phase 2: LOD Selection
[numthreads(64, 1, 1)]
void LODSelectionCS(uint3 threadID : SV_DispatchThreadID)
{
    uint visibleIndex = threadID.x;
    uint clusterIndex = VisibleClusters[visibleIndex];
    MeshCluster cluster = ClusterBuffer[clusterIndex];
    
    // Calculate screen space error
    float distance = length(cluster.center - cameraPos);
    float screenSpaceError = cluster.lodError / distance;
    
    // Select appropriate LOD
    if (screenSpaceError < errorThreshold)
    {
        // Use this cluster
        DrawCluster(clusterIndex);
    }
    else
    {
        // Use parent cluster
        DrawCluster(cluster.parentIndex);
    }
}
```

![GPUカリング](images/GPUCulling.png)

---

## 現在の実装状況

### ? 完了した機能

1. **メッシュインポート**: FBX/OBJからのメッシュ読み込み
2. **クラスタ生成**: K-meansベースのクラスタリング
3. **基本的なカリング**: フラスタムカリング実装

### ?? 開発中の機能

1. **階層的LOD生成**: メッシュ簡略化アルゴリズム
2. **オクルージョンカリング**: ハードウェアオクルージョンクエリ
3. **ストリーミング**: 動的メッシュロード

### ? 今後の実装予定

1. **ソフトウェアラスタライザー**: Compute Shader実装
2. **可視性バッファ**: マテリアルデカップリング
3. **メモリ最適化**: 仮想テクスチャとの統合

---

## パフォーマンステスト

### テストシーン: 大規模森林環境

- **総ポリゴン数**: 約1200万ポリゴン
- **描画されるポリゴン数**: 約80万ポリゴン（動的に変化）
- **フレームレート**: 60 FPS @ 1080p（RTX 3060）

![パフォーマンステスト](images/VirtualGeometry_Performance.png)

### 従来手法との比較

| 指標 | 従来のLOD | 仮想ジオメトリ |
|------|----------|--------------|
| 描画ポリゴン数 | 約300万 | 約80万 |
| メモリ使用量 | 450 MB | 280 MB |
| FPS | 45 FPS | 60 FPS |
| アーティスト工数 | 高（手動LOD作成） | 低（自動生成） |

---

## 技術的な課題

### 1. メッシュ簡略化の精度

**問題**: クラスタ統合時のジオメトリ誤差
**解決策**: QEM（Quadric Error Metrics）の導入

### 2. GPU負荷の分散

**問題**: コンピュートシェーダーのボトルネック
**解決策**: Indirect Drawによる動的ディスパッチ

### 3. メモリ管理

**問題**: 大規模シーンでのVRAM不足
**解決策**: ページングとストリーミングシステム

---

## 参考資料・実装のヒント

### 学術論文

- **Nanite**: [A Deep Dive](https://advances.realtimerendering.com/s2021/Karis_Nanite_SIGGRAPH_Advances_2021_final.pdf)
- **Cluster-Based Rendering**: Clustered Shading and Virtual Geometry

### 実装参考

```cpp
// クラスタ選択アルゴリズムの擬似コード
void SelectClusters(Camera& camera, ClusterTree& tree)
{
    std::queue<ClusterNode*> queue;
    queue.push(tree.root);
    
    while (!queue.empty())
    {
        ClusterNode* node = queue.front();
        queue.pop();
        
        // Calculate projected error
        float projectedError = CalculateProjectedError(node, camera);
        
        if (projectedError < threshold || node->isLeaf)
        {
            // Draw this cluster
            DrawCluster(node->cluster);
        }
        else
        {
            // Traverse children
            for (auto* child : node->children)
                queue.push(child);
        }
    }
}
```

---

## デモ動画・スクリーンショット

### クラスタ可視化

異なるLODレベルを色分けして表示しています。

![クラスタ可視化](images/ClusterVisualization.png)

- **赤**: LOD 0（最高詳細度）
- **黄**: LOD 1
- **緑**: LOD 2
- **青**: LOD 3（最低詳細度）

### 動的LOD切り替え

カメラの距離に応じて自動的にLODが切り替わります。

[video:videos/VirtualGeometry_Demo.mp4]

---

## 今後の展望

本技術は、次世代のゲームエンジン開発において重要な要素となります。
将来的には以下の機能との統合を目指しています：

- **レイトレーシング**: BVH加速構造との連携
- **動的オブジェクト**: 変形メッシュへの対応
- **マルチスレッド最適化**: タスクシステムとの統合

---

## まとめ

仮想ジオメトリシステムは、現代のゲーム開発において**アーティストの生産性向上**と**パフォーマンスの最適化**を両立する重要な技術です。

本プロジェクトを通じて、最先端のレンダリング技術への理解を深め、実践的な実装スキルを習得することができました。
