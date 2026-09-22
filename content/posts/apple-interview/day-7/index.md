---
title: "Apple Interview Prep - Day 7"
date: 2026-09-03
draft: true
---

## 3:07 pm


## What is a BxDF
- [ ] Q: What is a BxDF and what are some requirements for a function to be a valid BxDF?
A:
- A BxDF is an bidirectional distribution functions. A BRDF is for reflection, a BTDF is for transmission, BSDF is both. there are others, ie BSSRDF. 
  it describes how differential incoming irradiance is scattered into differential outgoing radiance.
  f_r(wo, wi) = dL_o / dE 
  A lambertian BRDF is equal to albedo over pi. 

  note to self: radiance = d^2 phi / ( costheta dA dw ) // flux per steradian per projected area
  Recipricality: for a BRDF, ( f_r( w_o, w_i ) = f_r( w_i, w_o) )
  Energy conservation: for all w_o, int(H^2) f_r(wo, wi) costheta dwi >= 0 and <= 1 // note, costheata is lambert cos law

## is GPU Branching slow?
- [ ] Q: Is branching on a GPU slow? If it depends, what does it depend on?
A:
Branching is not inherently slow. GPUs execute threads in lockstep in groups called warps/waves. If every lane takes the same branch, the cost is minimal control flow overhead. The problem is control-flow divergence. The GPU executes paths serially and masks off inactive lanes, causing a combined execution time for the warp.

This can be costly when divergent paths are expensive or occur frequently. For example, this problem can be exacerbated by loop with a termination condition, where lanes that finish early become inactive, but the warp continues to execute until the last lane terminates.

Indirect costs:
Branching can increase register pressure and lower occupancy.
Branching can lead to poor memory behavior and reduce cache locality.


## What is a Moire pattern
- [ ] Q: What is a "Moiré pattern" and why might it show up?

A: 
A moire pattern is a wavy, often low-frequency, interference pattern that results when fine repeating patterns overlap or interact through sampling. In CG, it is usually an unwanted form of **spacial aliasing**. It can occur when a high frequency pattern is undersampled by the pixel grid. For example a high frequency texture pattern is viewed at distance or at a grazing angle, many texels can map into a single pixel sample, causing aliasing. Mipmaps and trinlnear/anisotropic filtering can reduce the artifacts.

## ...
- [x] Q: Why is a z-prepass useful? When would it not be useful?

A z-prepass renders a cheap depth-only pipeline, populating the depth buffer with the nearest opaque surfaces. Subsequent material use early-z to reject occluded fragments before running costly pixel shaders. It helps with high opaque overdraw and expensive materials.  However, the cost of a z-prepass is extra geometry processing and depth work, so it may be less useful with low overdraw, cheap materials, or if geometry is already sorted front to back.

- [x] Q: What is "gamma"?

Gamma is an informal, somewhat ambiguous term for a nonlinear transfer function between encoded pixel values and luminance. In CG, it usually refers to an approximatly 2.2 power curve historically associated with CRTs displays and sRGB encoding/decoding.

- [ ] Q: Your "hello triangle" fails to produce a triangle. What are some problems you’d anticipate?

Could be anything. I would want to debug it step by step using the debug layer and a frame capture tool such as PIX.
you could have a bad driver.
You could be ignoring warning or error messages.
You could be not recording and submitting draw calls to a command list/queue. you could be using a draw command incorrectly, such as submitting the wrong number of indices.
IA - vertify vertex/index buffer address, stride, format, primitive topology.
VS - could have a bad transformation matrix. data could be bogus, row-column order could be wrong. your vertices could have garbage data, or they could be clipped to sides or front or back of the frustum.
PS - could be not writing any colors.
Rasterizer - could have the incorrect winding. could have the wrong viewport or scissor rect
Blending - could be drawing a black triangle on a black background
you could not be swapping the backbuffers
you could be clearing your buffer after drawing to it
your computer might be haunted by the ghost of a russian hacker

Did you write hello triangle from a tutorial or a sample? does the sample run? can you run a diff tool of your code against the sample code to see where it differs? do you have unit tests? did it produce a triangle before and suddenly start failing now? how has the code changed since then?

- [ ] Q: What makes a GPU fast? What are some tradeoffs made in achieving that acceleration?


