---
title: "1 Introduction"
date: 2022-02-05
draft: true
---


https://www.pbr-book.org/3ed-2018/Introduction#

### [1.1 Literate Programming](https://www.pbr-book.org/3ed-2018/Introduction/Literate_Programming#)

(weird, so skipped)

---

### [1.2 Photorealistic Rendering and the Ray-Tracing Algorithm](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm)

(skipped)

---

### [1.2.3 Light Distribution](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm#LightDistribution)

A light source has some power $\Phi$. If it's surrounded by a unit sphere, the power per area is $\frac{\Phi}{4 \pi}$.
The surface area of a sphere is $4 \pi r^2$, so a larger sphere results in less power per area by a factor of $\frac{1}{r^2}$.

For a tiny surface patch $\mathrm{d}A$ tilted away at angle $\theta$, the differential power per area $\mathrm{d}E$ (differential irradiance) is:
{{<katex>}}
$$
\mathrm{d}E = \frac{\Phi  \cos \theta }{4 \pi r^2 }
$$
{{</katex>}}

This equation shows popular computer graphics laws
- The $\frac{1}{r^2}$ distance falloff
- The cosine falloff for tilted surfaces


---

### [1.2.4 Visibility](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm#Visibility)

(skipped)

---

### [1.2.5 Surface Scattering](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm#SurfaceScattering)

(skipped)

---

### [1.2.6 Indirect Light Transport](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm#IndirectLightTransport)

Light transport equation (aka rendering equation)

$$
L_o(p,\omega_o) = L_e(p,\omega_o) + \int_{S^2} f(p, \omega_o, \omega_i ) L_i( p, \omega_i) \lvert \cos \theta_i \rvert \mathrm{d} \omega_i
$$

- $f$ is the BSDF. (To see the difference between the BSDF, BRDF, BTDF, and BSSRDF, see 5.6.1).
- To see why $\lvert \cos \theta \rvert$ has an absolute value, see 5.6.1)

---

### [1.2.7 Ray Propagation](https://www.pbr-book.org/3ed-2018/Introduction/Photorealistic_Rendering_and_the_Ray-Tracing_Algorithm#RayPropagation)

(skipped)

---

### [1.3 pbrt: System Overview](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#)

10 abstract base classes, `Shape`, `Aggregate`, `Camera`, `Sampler`, `Filter`, `Material`, `Texture`, `Medium`, `Light`, `Integrator`.

---

### [1.3.1 Phases of Execution](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#PhasesofExecution)

1. parse scene into `Scene` and `Integrator`  

2. Render scene with `Integrator::Render()`

---

### [1.3.2 Scene Representation](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#SceneRepresentation)
(skipped)

---

### [1.3.3 Integrator Interface and SamplerIntegrator](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#IntegratorInterfaceandSamplerIntegrator)
(skipped)

---

### [1.3.4 The Main Rendering Loop](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#TheMainRenderingLoop)
(skipped)

---

### [1.3.5 An Integrator for Whitted Ray Tracing](https://www.pbr-book.org/3ed-2018/Introduction/pbrt_System_Overview#AnIntegratorforWhittedRayTracing)

(skipped)

---

(rest of chapter skipped)

