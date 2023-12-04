---
title: "13 Monte Carlo Integration"
date: 2023-10-04
draft: true
---

## 13.6 2D Sampling with Multidimensional Transformations
[pbrt](https://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/2D_Sampling_with_Multidimensional_Transformations#)


### 13.6.3 Cosine-Weighted Hemisphere Sampling

[pbrt](https://www.pbr-book.org/3ed-2018/Monte_Carlo_Integration/2D_Sampling_with_Multidimensional_Transformations#Cosine-WeightedHemisphereSampling)


trying to find a distrubution such that
$p(\omega)\propto \cos \theta$

> insert proof here

$$
p(ω) = \frac{1}{\pi}  \cos \theta 
$$

$$
p(\theta,\phi) = \frac{1}{\pi} \cos\theta\sin\theta
$$

> insert proof here, malleys method, jacobian

```cpp
inline Vector3f CosineSampleHemisphere(const Point2f &u)
{
    Point2f d = ConcentricSampleDisk(u);
    float z = sqrt(max(0.0f, 1 - d.x * d.x - d.y * d.y));
    return Vector3f(d.x, d.y, z);
}
```

```cpp
float CosineHemispherePdf(float cosTheta) { return cosTheta * InvPi; }
```
