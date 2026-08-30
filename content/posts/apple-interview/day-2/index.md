---
title: "Apple Interview Prep - Day 2"
date: 2026-08-29
draft: true
---

## 4:06 pm Coffee time

Got a butterbeer latte. With whip cream and sprinkles. It was gross.

We're going to read all of these today.
- https://fgiesen.wordpress.com/2011/07/09/a-trip-through-the-graphics-pipeline-2011-index/
- https://fgiesen.wordpress.com/2011/07/01/a-trip-through-the-graphics-pipeline-2011-part-1/
- https://fgiesen.wordpress.com/2011/07/02/a-trip-through-the-graphics-pipeline-2011-part-2/
- https://fgiesen.wordpress.com/2011/07/03/a-trip-through-the-graphics-pipeline-2011-part-3/
- https://fgiesen.wordpress.com/2011/07/04/a-trip-through-the-graphics-pipeline-2011-part-4/
- https://fgiesen.wordpress.com/2011/07/05/a-trip-through-the-graphics-pipeline-2011-part-5/
- https://fgiesen.wordpress.com/2011/07/06/a-trip-through-the-graphics-pipeline-2011-part-6/
- https://fgiesen.wordpress.com/2011/07/08/a-trip-through-the-graphics-pipeline-2011-part-7/
- https://fgiesen.wordpress.com/2011/07/10/a-trip-through-the-graphics-pipeline-2011-part-8/
- https://fgiesen.wordpress.com/2011/07/12/a-trip-through-the-graphics-pipeline-2011-part-9/
- https://fgiesen.wordpress.com/2011/07/20/a-trip-through-the-graphics-pipeline-2011-part-10/
- https://fgiesen.wordpress.com/2011/08/14/a-trip-through-the-graphics-pipeline-2011-part-11/
- https://fgiesen.wordpress.com/2011/09/06/a-trip-through-the-graphics-pipeline-2011-part-12/
- https://fgiesen.wordpress.com/2011/10/09/a-trip-through-the-graphics-pipeline-2011-part-13/

### ryg Graphics Pipeline Part 1 (of 13)

- https://fgiesen.wordpress.com/2011/07/01/a-trip-through-the-graphics-pipeline-2011-part-1/

General points about the graphics stack
- Application
- API runtime
- UMD (user mode driver)
    - .dll(s) implementing DDI called by D3D
    - shader compilation
    - suballocates memory from KMD (kernal mode driver)
    - writes cmd bufs (/"DMA bufs")
- Graphics Scheduler
    - Owned by OS, sits between UMD and KMD, context switches between apps wanting to use 3D pipeline
- KMD
    - allocate/map physical memory
    - initialize gpu at startup
    - set display modes from displays
    - manage hardware mouse cursor
    - manage hardware watchdog timer
    - respond to interrupts
    - main command ring buffer
- Bus
    - usually PCIE
    - dma transfers
        - ie: LoadTexture("image.png") os issues i/o request to nvme controller, which DMAs memory over pcie to ... to process heap
- Cmd Processor
    - reads KMD commands

### ryg Graphics Pipeline Part 2 (of 13)

https://fgiesen.wordpress.com/2011/07/02/a-trip-through-the-graphics-pipeline-2011-part-2/

- Memory Subsystem
    - GPU memory bandwidth way faster than CPU
    - GPU cache miss (latency?) way slower than CPU
    - DRAM (used for cpu ram and gpu vram) organized as a grid
        - controller activates a row, loading it into a buffer.
        - subsequent access to elements in that row is cheap

- pcie host interface
    - cpu reading gpu memory / gpu reading cpu memory has to go through pcie
    - lower band width than cpu reading cpu memory or gpu reading gpu memory

- Cmd Processor
    - must be sequencial because of state changes
    - large, buffered, prefetched
    - state changes not so simple.
        - different strategies such as flushing, keeping multiple states, stateless

- Synchronization
    - CPU-visible GPU register
        - gpu updates counter after executing certain events
    - gpu can wait on a fence
        - ie: render target texture.
          - CPU records in command buffer:
                - Draw that writes texture.
                - Write-fence after that draw.
                - Later, wait-fence before a draw that reads the texture.
                - (APIs often express this with render passes and barriers instead of explicit fences for every dependency.)
            - gpu executes: draw -> write-fence -> wait fence -> draw (read texture)



## Today's Summary
Today we went through ryg graphics pipeline parts 1 and 2 (of 13).
- **Software Stack**: Application -> API runtime -> UMD(s) -> KMD
- **UMD**: (user mode driver) builds cmd bufs, compiles shaders
- **Graphics** Scheduler: Part of OS+KMD, time-slices and context-switches GPU access between apps. 1 per gpu
- **KMD:** (kernel mode driver) physical cmd ring buf, responds to interrupts, 1 per computer.
- **Memory**(pt1): vram = high bandwith/throughput/latency. cpu <->gpu over pcie is slower. 
- **Memory**(pt2): dram (ram and vram) organized as a grid, entire row activates.
- **Cmd Processor**: prefetches/buffers cmds from the cmd ring buf and executes them sequentially.
- **Synchronization**: shared registers written/read/waited by cpu/gpu. ie: render target textures use fences/barriers
- Command Lifetime
    - Apps **UMDs** submit cmds to **KMD**
    - **Cmd Scheduler** time-slices/context-switches between them.
    - **Cmd Processor** prefetches/buffers/executes them sequentially.


