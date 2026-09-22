---
title: "Apple Interview Prep - Day 13"
date: 2026-09-13
draft: true
---

## 1:40 pm

Ate breakfast with grandma, now it's study time.

https://medium.com/@koradeganesh/multithreading-in-c-a-practical-guide-for-developers-454f366ba38e
- Processes vs Threads
- Atomics

      ```cpp
      std::atomic<int> counter(0);
      void atomic_increment_1000()
      {
            for( int i = 0; i < 1000; i++)
                  counter.fetch_add(1, std::memory_order_relaxed)
      }
      ```

      https://en.cppreference.com/cpp/atomic/atomic/fetch_add
      T fetch_add( T arg, std::memory_order order = std::memory_order_seq_cst ) noexcept;

      https://en.cppreference.com/cpp/atomic/memory_order
            memory_order_relaxed guarantees automicity, but not ordering or synchronization
- Semaphores
      - c++14 (and earlier): std::mutex and std::condition_variable
      - c++20: `std::counting_semaphore<N>`




- [ ] Q: What is std::condition_variable and how is it used?
https://en.cppreference.com/cpp/thread/condition_variable

There's the condition, and the condition variable.

```cpp
/*
            Thread A                                Thread B
               |                                       |
          lock_guard(mtx)                        unique_lock(mtx)    
               |                                       |
               |                    // note: this unlocks the lock until finished waiting
     modify shared variable         condition_variable::wait.*(ulock, ... )
               |
  condition_variable::notify.*
*/


#include <...>

std::mutex m;
std::condition_variable cv; // condition variable
std::string data;
bool ready{};               // condition for worker thread
bool processed{};           // condition for main thread

void worker_thread()
{
      std::unique_lock lk(m);
      cv.wait(lk, []{ return ready; }); // C++23 lambda w/o parameter list
      data = "worker thread has processed data";
      processed = true;
      lk.unlock();
      cv.notify_one();
}

int main()
{
      std::thread worker(worker_thread);
      data = "initial data";
      {
            std::lock_guard lk(m);
            ready = true;
      }
      cv.notify_one();
      {
            std::unique_lock lk(m);
            cv.wait(lk, []{return processed;})
      }
      std::cout << "data: " << data << '\n';
      worker.join();
}

```

https://en.cppreference.com/cpp/thread/unique_lock
It's like a std::lock_guard, but it can do more things, such as deferring locking, and works with condition variables.

---

## 2:55 pm

https://bartoszmilewski.com/2008/12/01/c-atomics-and-memory-ordering/
- [ ] Q: What is double-checked locking?
- [ ] Q: What is the Peterson lock?
- [ ] Q: What is the Publication Safety Pattern?

```cpp
atomic<bool> ready = false;
atomic<int> data = 0;
// thread 0:
data.store(1);
ready.store(true);
// thread 1:
if( ready.load() ) { assert( data.load() == 1 ); }
```

How can this code be optimized to reduce fences?

```cpp
atomic<bool> ready = false;
atomic<int> data = 0;
// thread 0:
data.store(1, memory_order_release);
ready.store(true, memory_order_release);
// thread 1:
if( ready.load(memory_order_acquire) ) { assert( data.load(memory_order_acquire) == 1 ); }
```

- memory_order_acquire: guarantees that subsequent loads are not moved before the current load or any preceding loads.
- memory_order_release: preceding stores are not moved past the current store or any subsequent stores.
- memory_order_acq_rel: combines the two previous guarantees.
- memory_order_consume: ... deprecated( replaced with acquire?)
- memory_order_relaxed: all reorderings are okay.

---

https://en.wikipedia.org/wiki/Double-checked_locking

```cpp
// with c++11
import std;

using std::once_flag;
using std::optional;

class Singleton {
private:
    static optional<Singleton> inst;
    static once_flag flag;
public:
    static Singleton* instance() {
        std::call_once( Singleton::flag, [] -> void { inst.emplace(Singleton()); });
        return &inst;
    }
};
```

```cpp
// pre c++11
import std;

using std::atomic;
using std::lock_guard;
using std::memory_order;
using std::mutex;

class Singleton {
private:
    static atomic<Singleton*> inst;
    static mutex m;
public:
    static Singleton* instance() {
        // First check, synchronize with a matching release store, if observed
        Singleton* s = inst.load(memory_order::acquire);
        if (!s) {
            // lock: make initial path happen 1 thread at a time.
            lock_guard<mutex> lock(m);

            // second check. relaxed because acquiring mutex syncs with previous lock holders init.
            s = inst.load(memory_order::relaxed);
            if (!s) {
                s = new Singleton();
                inst.store(s, memory_order::release);
            }
        }
        return s;
    }
};
```


--- 

## 3:34 pm

https://towardsdev.com/cpp-atomic-memory-ordering-explained-2a5a69ed025b
```cpp
Thread A (producer)                   Thread B (consumer)
───────────────────────               ──────────────────────────────
data = 42;                            while (flag.load(acquire) == false)
more_data = 99;                           { /* spin */ }
flag.store(true, release);
                                      // happens-before edge established.
      │                               // everything written before
      │                               // the release-store is visible.
      └──── synchronises-with ──────► assert(data == 42);      // guaranteed
                                      assert(more_data == 99);  // guaranteed
```

memory_order_acq_rel
- for RMW ops, canonical example is ref counting
- `if (ref_count.fetch_sub(1, std::memory_order_acq_rel) == 1) { destroy_resource(); }`

https://towardsdev.com/lock-free-programming-in-c-compare-and-swap-without-the-magic-4e8a8f278d90
std::atomic::compare_exchange_weak / compare_exchange_strong
```cpp
// Lock free stack push - textbook example
std::atomic<Node*> head{nullptr};

void push(Node* node) {
    Node* old_head = head.load(std::memory_order_relaxed);
    do
    {
      node->next = old_head;
    }
    while( !head.compare_exchange_weak(
      old_head, // expected in atomic object, updated on failure
      node, // desired to be stored if it is as expected
      std::memory_order_release, // success
      std::memory_order_relaxed ) ); // failure
}
```

a tagged ptr can help avoid the ABA problem when
is_always_lock_free 

`std::launder` is a thing that exists.

## 4:22 pm

- [ ] Q: What is the producer-consumer problem?

Imagine a bakery.  
      - Producers produce loaves of bread, and place on shelf.
      - Producers cannot produce bread if the shelf is full (they must wait).
      - Consumers buy bread from the shelf.
      - Consumers canot buy bread if the shelf is empty (they must wait). 

Imagine a streaming service
      - Producers download and buffer video data
      - Consumers play the video for the user
      - Buffer holds video data temporarily before being played

https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem

Hoare Monitor
```cpp
template<size_t N>
class Bounded_buffer {
  Portion buffer[N];         // 0..N-1
  size_t head = 0, tail = 0; // 0..N-1
  size_t size = 0;           // 0..N
  std::condition_variable non_empty, non_full;
  std::mutex mtx;

public:
  void append(Portion portion) {
    std::unique_lock lck(mtx);
    non_full.wait(lck, [&]{ return size != N; });
    assert(size < N);
    buffer[tail++] = std::move(portion);
    tail %= N;
    ++size;
    non_empty.notify_one();
  }

  Portion remove() {
    std::unique_lock lck(mtx);
    non_empty.wait(lck, [&]{ return size != 0; });
    assert(size <= N);
    Portion portion = std::move(buffer[head++]);
    head %= N; 
    --size;
    non_full.notify_one();
    return portion;
  }
};
```
