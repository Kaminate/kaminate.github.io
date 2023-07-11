---
title: "5 Color and Radiometry"
date: 2023-03-19
draft: true
---

- [ ] deleteme https://drive.google.com/drive/my-drive `pbrt notes spiral.pdf`

https://www.pbr-book.org/3ed-2018/Color_and_Radiometry

__Radiometry__ - Study of electromagnetic radiation (EMR) propagation

__Visible light__ - EMR wavelength (λ) 380 nm - 780 nm

EMR is described by 4 radiometric quantities
- flux
- intensity
- irradiance
- radiance

Each quantity is described by a __spectral power distribution__ (SPD) function.

I think of light as a whole bunch of photons, and each photon has a wavelength associated with it. The collection of all of these photons is called the spectrum, and the SPD shows how many photons are at each wavelength.

--- 


### [5.1 Spectral Representation]( https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Spectral_Representation )

In pbrt this defaults to the `RGBSpectrum` class in [core/spectrum.cpp](https://github.com/mmp/pbrt-v3/tree/master/src/core/spectrum.h)

--- 

### [5.2 The SampledSpectrum Class](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/The_SampledSpectrum_Class)

(skipped)

--- 

### [5.2.1 XYZ Color](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/The_SampledSpectrum_Class#XYZColor)

__tri stimulus theory__ - all SPDs can be represented for humans with 3 values, $x_\lambda$, $y_\lambda$, $z_\lambda$

{{<katex>}}
$$
x_\lambda = \int_\lambda \! S(\lambda) \, X(\lambda) \, \mathrm{d}\lambda
$$
$$
y_\lambda = \int_\lambda \! S(\lambda) \, Y(\lambda) \, \mathrm{d}\lambda
$$
$$
z_\lambda = \int_\lambda \! S(\lambda) \, Z(\lambda) \, \mathrm{d}\lambda
$$
{{</katex>}}

Emissive SPD $S(\lambda)$ is integrated with __spectral matching curve__ $X(\lambda)$, $Y(\lambda)$, $Z(\lambda)$

![alt text](xyz_color.png)

note: the emissive SPD is given (the input)
x_\lambda y z are the outputs

![](spectral_matching_curves.png)
Spectral Matching Curves $X(\lambda)$, $Y(\lambda)$, $Z(\lambda)$

Although XYZ represents SPDs well for a human, computation is better done with more accurate SPD representations, before being converted to XYZ.

XYZ coefficients are ($x_\lambda$, $y_\lambda$, $z_\lambda$)

```cpp
// Values of the spectral matching curves at each wavelength
const Float CIE_X[nCIESamples] = { ... }; 
const Float CIE_Y[nCIESamples] = { ... };
const Float CIE_Z[nCIESamples] = { ... };
```

```cpp
// Wavelengths that each spectral matching curve value corresponds to
const Float CIE_lambda[nCIESamples] = { ... };
```

--- 

### [5.2.2 RGB Color]( https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/The_SampledSpectrum_Class#RGBColor)

Different LED displays have different emission curves.
|     |     |
| --- | --- |
| ![](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/lcd-display-spd.svg) | ![](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/led-display-spd.svg)   |

I believe(?) these are the same as the display's spectral response curves $R(\lambda)$, $G(\lambda)$, $B(\lambda)$.

The same RGB values $(r,g,b)$ produce different SPDs on different displays.

Recall that ($x_\lambda$, $y_\lambda$, $z_\lambda$) is the representation of an SPD in XYZ space, $X(\lambda)$, $Y(\lambda)$, $Z(\lambda)$ are the XYZ spectral matching curves, and that $S(\lambda)$ is an emissive SPD.

A SPD in XYZ color space
$$
S(\lambda) = x_\lambda X(\lambda) + 
             y_\lambda Y(\lambda) + 
             z_\lambda Z(\lambda) \\
$$

A SPD in RGB color space
$$
S(\lambda) = r R(\lambda) + 
             g G(\lambda) + 
             b B(\lambda)
$$

Converting from XYZ to RGB color space
{{<katex>}}
$$
\begin{align*}
r &= \int \! R(\lambda) \, S(\lambda)
                            \, \mathrm{d}\lambda \\
r &= \int \! R(\lambda) \, (x_\lambda X(\lambda) +
                            y_\lambda Y(\lambda) + 
                            z_\lambda Z(\lambda)) 
                            \, \mathrm{d}\lambda \\
r &= x_\lambda\int \! R(\lambda) \,  X(\lambda) \, \mathrm{d}\lambda +
     y_\lambda\int \! R(\lambda) \,  Y(\lambda) \, \mathrm{d}\lambda +
     z_\lambda\int \! R(\lambda) \,  Z(\lambda) \, \mathrm{d}\lambda 
\end{align*}
$$
{{</katex>}}


{{<katex>}}
$$
% define a macro intprod (integral product) for use outside the current group
\gdef\intprod#1#2{   \int \! #1(\lambda) \, #2(\lambda) \, \mathrm{d}\lambda }
$$
{{</katex>}}


{{<katex>}}
$$
\begin{bmatrix} r \\ g \\ b \end{bmatrix} = 
\begin{bmatrix} \intprod{R}{X} & \intprod{R}{Y} & \intprod{R}{Z} \\
                \intprod{G}{X} & \intprod{G}{Y} & \intprod{G}{Z} \\
                \intprod{B}{X} & \intprod{B}{Y} & \intprod{B}{Z} \end{bmatrix} 
\begin{bmatrix} x_\lambda \\ y_\lambda \\ z_\lambda \end{bmatrix}
$$
{{</katex>}}

This conversion matrix has been precomputed in pbrt using standard RGB for high-def tv in `XYZtoRGB()`.


---

### [5.3 RGBSpectrum Implementation](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/RGBSpectrum_Implementation#)

(skipped)

---

### [5.4 Radiometry](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry)

Make a couple assumptions based on __geometric optics__, such as __linearity__ and __no polarization__.

---

### [5.4.1 Basic Quantities](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#BasicQuantities)

1. Flux
2. Irradiance / radiant exitance
3. Intensity
4. Radiance

---

### [Energy](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#x1-Energy)

Energy ($Q$) is measured in joules ($J$). A photon at wavelength $\lambda$ has energy

$$
Q=\frac{hc}{\lambda}
$$

where $c$ is the speed of light and $h$ is Planck's constant.

---

### [Flux](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#x1-Flux)

__Radiant flux__ (aka __power__) is measured in joules/sec ($\frac{J}{s}$) or watts ($W$)

$$
\Phi = \frac{\mathrm{d}Q}
            {\mathrm{d}t}
$$

Given a light source that emitted $Q=200000J$ over half an hour, the flux is $$\Phi=200000J/3600s\approx55W$$

If flux is a function of time, it can be integrated to find the total energy.

{{<katex>}}
$$
Q=\int_{t_0}^{t1} \! \Phi(t) \, \mathrm{d}t
$$
{{</katex>}}

---

### [Irradiance and Radiant Exitance](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#x1-IrradianceandRadiantExitance)

Given area $A$, the average density of power over area is $E=\Phi/A$, measured in $W/m^2$

__Irradiance__ (E), area density of flux arriving at a surface  
__Radiant exitance__ (M), area density of flux leaving at a surface

Defined as the differential power per differential area at a point $p$
$$
E(\mathrm{p}) = \frac{\mathrm{d}\Phi(\mathrm{p})}{
                      \mathrm{d}A}
$$

Can also integrated over area to find power
$$
\Phi = \int_A E(p) dA
$$

__Lambert’s cosine law__ originates from the irradiance equation.

![](fig5.7.png)

Two surfaces, A1 and A2 recieving light from a light source with area $A$ and flux $\Phi$. 

The first surface has area $A_1 = A$  
The second surface has area $A_2 = \frac{A}{\cos \theta}$, ( $A_2 \cos \theta = A$ )

Because the same amount of light is spread over a larger surface area, the irradiance at a given point in $A_2$ will be smaller than the irradiance at a given point in $A_1$.

The first surface has irradiance $E_1$ at any point inside $A_1$

$$
E_1 = \frac{\Phi }{ A_1 } = \frac{\Phi }{ A }
$$

The second surface has irradiance $E_2$ at any point inside $A_2$

$$
E_2 = \frac{\Phi }{ A_2 } = \frac{\Phi }{ ( \frac{A}{\cos \theta}  )  } = \frac{ \Phi \cos \theta}{A}
$$

---

### [Solid Angle and Intensity](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#x1-SolidAngleandIntensity)

In 2D, an angle $\theta$ measured in __radians__ is equal to the arc length of an object subtended onto the unit circle.  
In 3D, a solid angle $sr$ measured in __steradians__ is equal to projected area of an object subtended onto a sphere.

![](radians_and_steradians.png)
<!--![](radians_and_steradians_subtend.png)-->

> Note: In pbrt, $\omega$ is a unit vector indicating a direction or a point on a unit sphere.

__Intensity__ ($I$) is the angular density of power. Over an entire sphere, $I = \frac{\Phi}{4 \pi}$, but more generally

$$
I = \frac{\mathrm{d} \Phi}{ \mathrm{d} \omega}
$$

As usual, intensity can be integrated over a set of directions $\Omega$ to recover the power

$$
\Phi = \int_\Omega I(\omega) d\omega
$$

Intensity is not really useful unless you use point lights.

---

### [Radiance](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#x1-Radiance)

The most important radiometric quantity!

__Radiance__ ($L$). Although irradiance gives power per differential area at point $p$, it doesn't distinguish direction.
Radiance measures irradiance per solid angle, where $E_\omega$ is irradiance at a surface perpendicular to $\omega$.
$$
L(p,\omega)=\frac{dE_\omega(p)}{d\omega}
$$

In terms of flux, it is flux per unit solid angle $d\omega$ per unit projected area $dA^\perp$

$$
L(p,\omega)=\frac{d\Phi}{d\omega dA^\perp}
$$

- [ ] Q: todo, relate dA and dA^\perp and cos theta?


---

### [5.4.2 Incident and Exitant Radiance Functions](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#IncidentandExitantRadianceFunctions)

(skipped)

---


### [5.4.3 Luminance and Photometry](https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Radiometry#LuminanceandPhotometry)

__Photometry__ is the study of EMR in terms of human perception.  
__Luminance__ ($Y$) measures how bright a SPD appears to a human. A green SPD will appear brighter than a blue SPD with the same energy.

$$
Y=\int_\lambda L(\lambda) V(\lambda) d\lambda
$$

$L(\lambda)$ is spectral radiance  
$V(\lambda)$ is the spectral response curve of human eye sensitivity to different wavelengths. Also known as the luminosity function, or CIE 1924 photopic luminous efficiency function.

$Y(\lambda)$ from the XYZ color is proportional to $V(\lambda)$
$$
Y=683\int_\lambda L(\lambda) Y(\lambda) d\lambda
$$

---

### [5.5 Radiometric Integrals]()
...

---

### [5.6 Surface Reflection]()

---