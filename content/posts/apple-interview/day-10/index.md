---
title: "Apple Interview Prep - Day 10"
date: 2026-09-06
draft: true
---

## 4:36 pm at Starbucks

The tables here are way too short.

- [ ] Q: Tell me about yourself
    - This question should be answerd using the present-past-future formula.
        - Present: Your current role/title/job summary/responsibilities/recent wins.
        - Past: Highlight key experiences/achievements that relate to the job you want.
        - Future: Explain why youre excited about this opportunity and how it matches your career goals.
        {{<br>}}
        Hi, I'm Nate. I'm a graphics programmer with a background in real-time gameplay engineering. Over the last several years, I've intentionally shifted from generalist work towards rendering systems through professional work and personal rendering experiments.
        {{<br>}}
        At Ready at Dawn, I had the chance to learn from experienced rendering engineers and see how production lighting and material systems translate light-transport theory into practical shader code, balancing performance and quality constraints. 
        {{<br>}}
        I enjoy going deep into graphics problems from first principles - from the math behind lighting and colors to GPU performance and pixels. This role excites me because compositing and UI bring these concerns together in a highly visible, performance-sensitive system, and I'd be happy to bring my rendering background while growing further in this space.
        {{<br>}}

- [ ] Q: Why compositing?
      - Working on a radiosity renderer made me rethink 'RGB' as not just a color, but as an encoding of coordinates in a particular color space, backed by specific primaries and encoding. This got me interested in how to represent a real light spectrum in a rendering system, and how these values are eventually mapped to an SDR or HDR display. Compositing seems like a place where these questions matter in a very practical, user-visble way.

## 6:12 pm

- [ ] Your best project deep dive:


    It has to be the radiosity renderer.

Goal:              What did you choose to build, and why?
Technical core:    What did it actually do?
Hard problem:      What was difficult or uncertain?
Your contribution: What decisions did you make?
Validation:        How did you know it worked?
Learning:          What changed in how you think?
Relevance:         Why does it make you interested in this role?


Problem/context.

What you owned.

Technical decision and tradeoff.

How you measured/debugged it.

Result and what you learned.

Use your real D3D12/graphics work. Do not invent Core Animation production experience.

Block 2: Five core answers
Say each once in 45–90 seconds:

What is compositing?

Why use premultiplied alpha?

Why render/composite in linear light?

Why is a Z-prepass useful, and when is it not?

Your hello-triangle debugging process.

Do not reread ten pages of notes. Practice producing the first clean explanation from memory.

Block 3: One mock problem
Pick one:

Design a simple retained-mode UI compositor.

Explain how you would diagnose animation jank or missed frame deadlines.

Do one ordinary medium C++ problem.

Explain CPU/GPU synchronization and frames in flight.

Use this answer pattern:

text
Clarify goal and constraints
→ state a simple baseline
→ identify bottleneck/correctness risks
→ propose an optimization
→ explain tradeoffs and how to measure it
The Monday plan
Monday is not for discovering new knowledge. It is for recall and sleep.

30 minutes: Read your one-page notes.

20 minutes: Say “tell me about yourself,” “why this role,” and one project story aloud.

15 minutes: Interview logistics—time zone, link, charger, headphones, internet, quiet space, water.

Stop. Eat normally and go to bed early.