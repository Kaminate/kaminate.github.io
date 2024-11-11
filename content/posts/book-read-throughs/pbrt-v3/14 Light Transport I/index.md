---
title: "14 Light Transport I"
date: 2023-10-05
draft: true
---

## 14.1 Sampling Reflection Functions
[pbrt](https://www.pbr-book.org/3ed-2018/Light_Transport_I_Surface_Reflection/Sampling_Reflection_Functions#)

[Recall]({{<ref "/posts/book-read-throughs/pbrt-v3/13 Monte Carlo Integration/index.md#coshemi">}}) the cosine-weighted sampling PDF: $$p(w)=\frac{ 1}{\pi}\cos(\theta)$$ 

```cpp
Spectrum BxDF::Sample_f(Vector3f &wo,
                        Vector3f &wi,
                        Point2f u,
                        float& pdf,
                        BxDFType *sampledType)
{
  Abs(wo.z);
  wi = CosineSampleHemisphere(u);
  pdf = Pdf(wo, wi);
  return f(wo, wi);
}
```

```cpp
float BxDF::Pdf(Vector3f wo, Vector3f wi)
{
  return SameHemisphere(wo, wi) ? AbsCosTheta(wi)/pi : 0;
}
```

--- 

### Question about BxDF::Pdf()

#### Questions

1. Why does `BxDF::Pdf` take two parameters (`wo` & `wi`) instead of one parameter ($\omega$ or $\theta$) when calculating the PDF?
1. In `BxDF::Pdf`, is the $\theta$ from `AbsCosTheta` calculated via $\theta = \omega_o \cdot \omega_i$?
1. Since $p(\omega)=\frac{1}{\pi}\cos\theta$, where is the $\omega$ and $\theta$ in `BxDF::Pdf`?
1. What is the difference between `Bxdf::Pdf` and `CosineHemispherePdf` from Ch 13?

#### Answers

1. `wo` is only used for `SameHemisphere`, the PDF calculation only takes `wi`.
1. $\theta$ is calculated from `wi`. 
1. ;
1. ;

In summary, during `BxDF::Sample_f`, the vector `wi` is created from random numbers/stratified samples/low-discrepancy samples 

https://www.pbr-book.org/3ed-2018/Reflection_Models#x0-GeometricSetting

```cpp
float AbsCosTheta(Vector3f w) { return abs(w.z); }
```

---


$$
\cos\theta = n \cdot \omega = (0,0,1) \cdot \omega = \omega _z
$$


[ ] Q: is `Vector3f wi` the normal or something?

