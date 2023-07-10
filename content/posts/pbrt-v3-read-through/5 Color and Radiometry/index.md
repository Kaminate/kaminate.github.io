---
title: "5 Color and Radiometry"
date: 2023-03-19
draft: true
---

# 5 Color and Radiometry
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

https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/Spectral_Representation

In pbrt this defaults to the `RGBSpectrum` class in [core/spectrum.cpp](https://github.com/mmp/pbrt-v3/tree/master/src/core/spectrum.h)

https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/The_SampledSpectrum_Class

https://www.pbr-book.org/3ed-2018/Color_and_Radiometry/The_SampledSpectrum_Class#XYZColor

XYZ Color
__tri stimulus theory__ - all SPDs can be represented for humans with 3 values, $x_\lambda$, $y_\lambda$, $z_\lambda$

{{<katex>}}
$$
x_\lambda = \int_\lambda \! S(\lambda)\, X(\lambda) \, \mathrm{d}\lambda
$$
$$
y_\lambda = \int_\lambda \! S(\lambda) \,Y(\lambda) \, \mathrm{d}\lambda
$$
$$
z_\lambda = \int_\lambda \! S(\lambda) \,Z(\lambda) \, \mathrm{d}\lambda
$$
{{</katex>}}

![alt text](xyz_color.png)

note: the emissive SPD is given (the input)
x_\lambda y z are the outputs



