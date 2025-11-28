# PBR & レイトレーシング

## DXR (DirectX Raytracing) による実装

CG検定の勉強をしていた際に目に留まったレイトレーシングを試してみた作品になります。

調べている際に負荷が高く現状ではゲームには利用することが難しいとの記載がありましたが、**実際に自身で制作してみてどの部分の処理が重いのか、一部だけでも利用できる部分はないのかなどを思い**制作に至りました。

## DXR (DirectX Raytracing) による実装

作品[FrameWork](project-template.html?project=dx-framework)にてPBRはすでに検証済みであったので、本作ではDirectX12に挑戦してDXRを使用し制作してみました。

![DXR 実装](images/DXR.png)

## 使用しているマテリアル

![マテリアル](images/Material.png)

## BRDFについて

### CookTorrance
![BRDF1](images/BRDF_CookTorrance.png)

### DisneyPrincipled
![BRDF2](images/BRDF_DisneyPrincipled.png)

### OrenNayar
![BRDF3](images/BRDF_OrenNayar.png)

### AshikhminShirley
![BRDF4](images/BRDF_AshikhminShirley.png)
