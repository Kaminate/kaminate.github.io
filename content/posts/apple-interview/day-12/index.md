---
title: "Apple Interview Prep - Day 12"
date: 2026-09-11
draft: true
---

## 10:43 am

I just flew to Texas, staying with my aunt and uncle, who are taking care of my grandmother.
We passed the first apple interview (yeah boiii). Today is Friday, the next apple interiew is Monday.
I maybe should have scheduled it for Thursday or Friday to give myself more time, but I would be in San Diego by then and idk I don't want this to take forever.
{{<br>}}
Anyways, my previous interviewer Gustavo and I both worked on Forza Motorsport at Turn 10 and on VR at Meta, so most of the time we were chit chatting and I didn't have to recall anything I was studying. That said, I should still probably try and practice recalling delving deep into my Radiosity project details.
{{<br>}}
Today the goal is to start brushing up on multithreaded programming. AI says to memorize the following:
- data race
- mutex
- atomic
- condition variable
- deadlock
- contention
- false sharing
- acquire/release
- thread pool
{{<br>}}
Additionally, i googled "multithreading for graphics programmers" and found some blog posts to read
- https://vkguide.dev/docs/extra-chapter/multithreading/ 
- https://vilbeyli.github.io/Modernizing-a-DirectX-real-time-renderer-0/
- https://agraphicsguynotes.com/posts/fiber_in_cpp_understanding_the_basics/
- https://medium.com/@koradeganesh/multithreading-in-c-a-practical-guide-for-developers-454f366ba38e

## Term: Data Race

https://en.wikipedia.org/wiki/Race_condition  
A **race condition**, or **race hazard**, is the condition of a system where its behavior is dependent on the timing of uncontrollable events. It becomes a bug when one of the behaviors is undesirable. It is preventable by **mutual excludsion**.

State shared by threads can be corrupted when operated by theads without **mutually exclusive** **critical sections**.

(some consider) A data race is a type of race condition.

A race condition can be difficult to reproduce and can dissappear when running in a debugger, or when adding debug logging information.

A data race is a memory corruption that occurs when multiple threads access the same block of memory.
In other words, their memory operations **conflict** when they 
- access the same memory location
- are unordered
- and at least one of them is a write.

Examples:
- Thread A writes to memory while thread B reads it.
- Thread A and B write to memory at the same time.
Safe simultaneous operators are called atomic/synchronization operators.  
Unsafe simultaneous operators are called data operators.

## ...

---


https://en.wikipedia.org/wiki/Mutual_exclusion  
Mutual exclusion


---


https://stackoverflow.com/questions/6319146/c11-introduced-a-standardized-memory-model-what-does-it-mean-and-how-is-it-g



- [x] Q: Define data race  
      A: A data race condition is a type of race condition that can result in data corruption when multiple threads access the same memory location in an unordered manner and at least one of the threads is a write.

- [x] Q: Define mutual exclusion
Mutual exclusion is a the property of a critical section by which only one thread can access the critical section at a time. It can be used as a synchronization strategy.

- [x] Q: Define critical section
A critical section is a section of code that accesses shared mutable state. It cannot be used safely without  mutual exclusion. In other words, a region of code becomes a critical section when its concurrent exection could cause conflicting access.

- [ ] Q: Define synchronization
Synchronization is the coordination of concurrent threads, providing ordering and visibility of shared state.

- [ ] Q: What is the Producer–consumer problem?
- [ ] Q: What's the difference between a data race and a race condition?
- [ ] Q: What are all these https://en.cppreference.com/cpp/thread









