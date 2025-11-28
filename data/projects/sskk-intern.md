# 初期目標
![SSKK説明01](images/sskk-01.png)
![SSKK説明02](images/sskk-02.png)


# プロジェクト概要
## SDFモデリングの実装
このプロジェクトは**粘土っぽい見た目**を目指すためにスノードームの中のアセットを**SDFモデルでレンダリング**しています。
そのため、実装へ向けUnityのRenderFeatureなどへの理解や、描画順序の制御、SDFの基礎的な理解などが必要となります。


# 自身の担当部分

### ガラスマテリアル
上記の内容があるので、歪ませる処理の実装のため描画順、どのタイミングの絵が必要かなどを考慮しつつ、ガラスマテリアルの実装を行いました。

![glass](images/glass.png)

---

# ポストエフェクト

### ブルーム
![postprossing](images/shader-topic.png)
### スキャンライン
![postprossing2](images/postprossing2.png)
### ティルトシフト
![postprossing3](images/postprossing3.png)
### Kuwaharaフィルター
![postprossing4](images/postprossing4.png)

---

# 最終的な成果物

### シームレスに無限ループする構造

[video:videos/Snowglobe_CameraLoop.mp4]
[video:videos/Snowglobe_CameraRotate.mp4]
[video:videos/Snowglobe_CameraAngles.mp4]
