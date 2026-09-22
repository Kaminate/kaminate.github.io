---
title: "Apple Interview Prep - Day 11"
date: 2026-09-08
draft: true
---

## 10:34 am

Ate breakfast.  1.5 hrs until interview. Let's do a quick review for an hour, then relax.

## Review of Day 1

- [ ] Q: "Tell me about a time when you had to work with a team to accomplish a goal?"
Probably the best example here is the runner zombie. There's also minecart lights.

- [ ] Q: "Give me an example of when you worked under pressure to meet a deadline?"
Animating quest text in zombies.

- [ ] Q: "What areas do you think you need to develop further?"

in my own work, prioritized for learning and ease of debugging
in professional work, systems already mature and heavily optimized, so ive learned how to work safely within these constraints. 

however theres an opportunity for growth in-between these two spectrum of developing a deeper understanding of hardware performance and optimization. Despite interest in mathmatical and algorithmic side (ie radiosity), want more fluency in translating choices with GPU architecture, memory behavior, bandwith, etc. In particular, profiling... bottleneck... changes.

- [ ] Q: Questions for interviewer
    - [ ] 
    "What does success look like in this role?" --> "You mentioned that the team spends a lot of time on performance investigation. For someone new, what would becoming effective at that look like in the first few months?"

    - [ ] 
    "What kinds of problems would I likely spend the most time on early in the role?"
    "As I grow in the role, what kinds of systems or areas might an engineer on this team typically end up owning?"

```cpp
Node* Reverse( Node* oldList )
{
    Node* newList{};
    while( oldList )
        push_front(newList, pop_front(oldList));
    return newList;
}
```

## 10:54 am


## Review of Day 2

- Graphics Stack
    - Application
    - API runtime
    - UMD
    - KMD
    - Graphics Scheduler
    - Bus
    - Command Processor
- Memory, Synchronization
- Command Lifetime
    - Apps UMDs submit cmds to KMD
    - Cmd Scheduler time-slices/context-switches between them.
    - Cmd Processor prefetches/buffers/executes them sequentially.

## Review of Day 3

- IA, VS, PA, HS, TS, DS, GS, SO, RS, PS, OM, CS
Coarse/fine rasterization, EarlyZ/HiZ

## Review of Day 4 (skipped)
## Review of Day 5

cie 1931 XYZ color space, xyY color space (chromacity, luminance)

### premultiplied alpha
$$C_{new} = C_{src} + C_{dst}(1-A_{src})$$

- makes filtering work (no halos)
- makes blending associative
- png always unassociated

### occupancy

Utilization of compute units wavefront slots. Limited by memory, can help hide latency.

### checkerboard shader

```glsl
s = sign( fract(uv) - .5 )
s.x * s.y;
```
f avg = (F(b)-F(a))/b-a
w = b-a = max(dfdx(uv),dfdy(uv))+.01;


## Review of Day 6 (skipped)
## Review of Day 7

bxdf, brdf, btdf, bsdf, bssrdf, lambertian c/pi.
radiance=flux/projected steradian/projected area.
L=d^2/costheta/da/dw

### gpu branching

not necessarily slow. ctrl flow divergence, masking off inactive lanes, warp continues until final lane terminates.

### moire
repeating patterns overlap, high freq pattens undersampled. mipmaps, filtering.

### z-prepass
depth only pipeline, opaque overdraw reduce costly PS. extra geometry processing / depth work.

### gamma
term for nonlinear transfer fn, encoded px value, luminance. 2.2 CRTs sRGB.

## Review day 8 (skipped)
## Review day 9 (skipped)
## Review day 10

### Tell me aobut yourself
real time gameplay --> graphics (professional+personal).
RAD -> mentor. production lighting/material systems.
enjoy first principles. math behind lighting to pixels.
this role (compositing/ui) brings these concerns together, visible, performance sensitive system.

### why compositing

radiosity --> rgb != color, = coordinates in a color space, backed by encoding and primaries. how to present real light in rendering system, mapped to sdr/hdr display.

## Review day 11

### Radiosity

I should think about my radiosity project. i might be talking about this a lot.

Q: why radiosity? most basics of basics. paused voxel cone tracing. also many production games use it for baked lighting. although its not real time, it tackles...

{{<br>}}
Rendering Eq --> Diffuse brdf --> Constant patch radiosity / reflectivity
{{<br>}}
Sampling probabilty and form factors
{{<br>}}
solving system of equations with jacobi iterations.
{{<br>}}
expected value and monte carlo estimator ( choose samples with specified probability, such that expectation of random number = value trying to compute)
`tac_radiosity_baker.cpp`

Other things that are difficult.
Integrating radiometric quantities, projected radiance, when to/not to put a costheta or sintheta. Converting integrals over steradians to integrals over area.

## 11:43
I think i just chill for the next 17 minutes before the interview.

## 12:05 Interview time

display for every device.
ui renderer/ aka core animation -> 3rd party. swiftui/uikit ( sits above us ) calls underlying ui renderer.
sister team: compositor team
sister team: metal api gpu driver.
sister team: hardware chip team. (can request specific hardware features from them)

q: why imgui ugly?
a: no compositing --> no cool layer based effects

q: how make code run fast?
a: bandwidth

brush up on multithreaded programming.








