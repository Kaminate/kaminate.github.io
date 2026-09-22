---
title: "Apple Interview Prep - Day 3"
date: 2026-08-30
draft: true
---

## 1:37 pm Coffee time

Got an iced latte. What did I cover yesterady? UMD/KMD/Graphics Scheduler/Command Processor.  10 days till interview.
Hopefully I can cover 3 or 4 more parts today.

## ryg Graphics Pipeline Part 3 (of 13)
3D pipeline overview, vertex processing.
- https://fgiesen.wordpress.com/2011/07/03/a-trip-through-the-graphics-pipeline-2011-part-3/


### 3D Pipeline Stages
- IA: reads vtx/idx data
- VS: processes vtx data
- PA: groups vtxs into prims
- HS: accepts patch prims, xforms ctrl pts, DS inputs, extra TS data
- TS: creates vtxs & connectivity for lines/tris
- DS: takes shaded ctrl pts, HS data, TS positions, turns them into vtxs
- GS: inputs prims ( w/ opt adj info) outputs prims. Primary hub for SO
- SO: writes GS output (xformed prims) to a buf
- RS: rasterizes prims
- PS: gets interpolated vtx data, outputs px colors, can write to UAVs.
- OM: gets shaded pxs from PS, does alpha blending and writes to backbuffer.
- CS: in its own pipeline. input is cbuf & threadid, can write to buffers and UAV.

#### Example paths
(w/o IA, PA, RS, OM)
- VS -> PS (d3d9)
- VS -> GS -> PS (d3d10)
- VS -> HS -> TS -> DS -> PS (d3d11 tessellation)
- VS -> HS -> TS -> DS -> GS -> PS (d3d11 tessellation)
- VS -> SO (stream-output)
- VS -> GS -> SO (stream-output)
- VS -> HS -> TS -> DS -> GS -> SO (stream-output)

Never used stream output, but there's a `D3D11_BUFFER_DESC bufferDesc { ..., D3D11_BIND_STREAM_OUTPUT, ... }` and `D3D11Device->SOSetTargets`.

### IA (Input Assembler)

- Loads idxs from idx buf, otherwise just use 0, 1, 2, ...
- Read per-vtx data from input vtx stream
- batches vtxs to be processed in VS by compute units ( in 1 or more wavefronts ).

### Shader Unit
- high latency math intrinsics
- few registers
- many threads
- bad at branches

## 2:38 pm

## ryg Graphics Pipeline Part 4 (of 13)

Texture samplers

https://fgiesen.wordpress.com/2011/07/04/a-trip-through-the-graphics-pipeline-2011-part-4/

### Texture State (needed to sample)
- Sampler State
    - Filter, addresssing, anisotropy 
- Texture Resource
    - Single or Array
    - Multisampling fmt
    - texel bit layout
- SRV
    - ie UNORM8_SRGB (0.1 float), UINT8 (int)

### Texture Request
ie 2D texture, 4x aniso sampling (SampleGrad) requires 6 floats.
- u, v
- dudx, dvdx
- dudy, dvdy

So gradients are calculated, then mip level, address mode, cube face, filtering.

### Texture Cache
Uhh textures sampling units take a while.
- small L1 cache
- long pipeline
    - A texture sample request misses 1 texel on avg, but sampler pipeline longer so it doesnt stall

### Filtering
- blend between samples in the cache


## 3:04 pm

My brain is busted, im getting sloppy.

## ryg Graphics Pipeline Part 5 (of 13)
Part 5: Primitive Assembly, Clip/Cull, Projection, and Viewport transform.

https://fgiesen.wordpress.com/2011/07/05/a-trip-through-the-graphics-pipeline-2011-part-5/

### Primitive Assembly
- Gather Verticies

### Viewport Clip/Cull
- Mostly straightforward

### Guard-band clipping
- Dont have to actually clip all erronous triangle, just the really erronous ones.
- If not too erronous, just skip offensive pixels instead

### Projection and Viewport Transform
#### Projection
    - clip space (x, y, z) / w -> NDCs
#### Viewport Transform
    - map NDC (x, y) -> pixel space (X, Y)
    - map NDC z (-1,1) -> Z (0,1) near/far plane.

### Back-face culling (etc)
- Sign of triangle cross product to determine winding

## 3:18 pm

## ryg Graphics Pipeline Part 6 (of 13)
Part 6: (Triangle) rasterization and setup.

https://fgiesen.wordpress.com/2011/07/06/a-trip-through-the-graphics-pipeline-2011-part-6/

- Coarse rasterizer: Edge tests at tile level → decide which 8×8 tiles over triangle AABB to keep.
- Fine rasterizer: same Pineda edge tests at pixel level → decide which pixels in those tiles are actually covered.

w/o MSAA
- per px: 3 edge tests, 1 bit coverage (covered or not)

w/ 4x MSAA
- per px: 4 sample positions * 3 edge tests = 12 edge tests, 4-bit coverage mask


## 3:40 pm
## ryg Graphics Pipeline Part 7 (of 13)
Part 7: Z/Stencil processing, 3 different ways.
https://fgiesen.wordpress.com/2011/07/08/a-trip-through-the-graphics-pipeline-2011-part-7/

### Early-Z/Stencil
Dont shade a pixel thats behind a wall

Rasterization -> Early Z -> PS -> Late Z

PS may write its own depth value, or discard, alpha test, A2C to prevent writing.

Hierarchical Z test at tile level

## 4:03 pm

I'm dead. This is all too dense, I'm not sure I'm learning anything or if its relevant to the interview and maybe i should be spending my time better studying something else. I'm skipping to the end because compute shaders are probably relevant.

## ryg Graphics Pipeline Part 13 (of 13)
Compute Shaders
https://fgiesen.wordpress.com/2011/10/09/a-trip-through-the-graphics-pipeline-2011-part-13/

Not part of the graphics pipeline.
CS thread idx, cbufs, resources.
CS threads bunched into warps, executed in lockstep.

### TGSM (Thread group shared memory)
32k memory between threads of same group (in shader unit)
### Barriers
- Group Synchronization barrier: Warps deactivated until all group threads reach the barrier
- Group Memory barrier: shared-memory flush
- Device Memory barrier: device-memory flush (uavs, bufs, texs).

### UVAs
- ...
### Structured/Append/Consume Buffers


