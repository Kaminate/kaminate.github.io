---
title: "Book Read Through - Mastering Graphics Programming with Vulkan - Ch 1"
date: 2026-10-18
draft: true
---

## 12:13 pm

### Building the project

Downloading the Vulkan SDK, going with the following components

| Use | Component                    | Notes                      |
| --- | ---                          | ---                        |
|     | GLM Headers                  | i have my own math library |
|     | SDL lib/headers              | i have my own os wrapper   |
|  x  | Volk header/src/lib          | `vulkan-1.dll` import lib  |
|     | Shader toolchain dbg symbols | shader compiler .pdb       |
|  x  | VMA headers                  | its like 10kb why not      |
|     | ARM64 bins                   | im on x64 dont need arm    |

|     |
| --- |
| Edit: Shader toolchain dbg symbols **needs** to be installed |

Space required: 1.75 GB

Already have cmake 4.2.0 installed
Installing python
```powershell
> winget install 9NQ7512CXL7T.
```
Updating Visual Studio 2022 (using vs22 instead of vs26 because im not paying for another visual assist license)

Getting the src, following instructions at

https://github.com/PacktPublishing/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition

```powershell
> git clone --recurse-submodules https://github.com/PacktPublishing/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition.git
> cd Mastering-Graphics-Programming-With-Vulkan-2nd-Edition
> python bootstrap.py
> git rm -r bootstrapping
> git submodule add https://github.com/corporateshark/bootstrapping.git bootstrapping
> python bootstrap.py
> cmake -S . -B project -G "Visual Studio 17 2022" -A x64
```


Opening `RaptorEngine2.sln`
Building Debug x64.

#### LNK1104 cannot open file `spirv-cross-cored.lib`

tl;dr: Vulkan SDK installation need the _Shader toolchain dbg symbols_ component.

Error LNK1104 cannot open file `C:\VulkanSDK\1.4.363.0\Lib\spirv-cross-cored.lib`

`CmakeLists.txt` contains the following reference to `spirv-cross-cored.lib`
```cmake
if (WIN32)
target_link_libraries(RaptorGraphics PRIVATE
    debug $ENV{VULKAN_SDK}/Lib/spirv-cross-cored.lib optimized $ENV{VULKAN_SDK}/Lib/spirv-cross-core.lib
    debug $ENV{VULKAN_SDK}/Lib/spirv-cross-reflectd.lib optimized $ENV{VULKAN_SDK}/Lib/spirv-cross-reflect.lib
    debug $ENV{VULKAN_SDK}/Lib/slangd.lib optimized $ENV{VULKAN_SDK}/Lib/slang.lib
    debug $ENV{VULKAN_SDK}/Lib/slang-rtd.lib optimized $ENV{VULKAN_SDK}/Lib/slang-rt.lib
    assimp-vc143-mt
    SDL3)
```

Debug library `spirv-cross-cored.lib` <-- not installed?

Release library `spirv-cross-core.lib`

I wonder if that's the _ARM64 bins_ I skipped?

Running `C:\VulkanSDK\1.4.363.0\maintenancetool.exe` to edit components

Wait hold up if i already have `spirv-cross-core.lib` then what would a missing `spirv-cross-cored.lib` have anything to do with _ARM64 bins_?

According to https://github.com/khronosgroup/spirv-cross, you can just 

```cmake
find_package(spirv_cross_c_shared REQUIRED)
target_link_libraries(MyExecutable PRIVATE spirv-cross-c-shared)
```

Making a change in `CMakeLists.txt`

```cmake
target_link_libraries(RaptorGraphics PRIVATE spirv-cross-c-shared)
target_link_libraries(RaptorGraphics PRIVATE
#        debug $ENV{VULKAN_SDK}/Lib/spirv-cross-cored.lib optimized $ENV{VULKAN_SDK}/Lib/spirv-cross-core.lib
#        debug $ENV{VULKAN_SDK}/Lib/spirv-cross-reflectd.lib optimized $ENV{VULKAN_SDK}/Lib/spirv-cross-reflect.lib
```

Still same error, can't find `spirv-cross-cored.lib`. wtf?

Who installed SPRIV-Cross?

`spriv-cross-core.lib` is in the vulkan sdk at `C:\VulkanSDK\1.4.363.0\Lib\spirv-cross-core.lib`

Does that mean it is a part of _Shader toolchain dbg symbols_?

**YEP**

Now I have `C:\VulkanSDK\1.4.363.0\Lib\spirv-cross-cored.lib`

Reverting my change in `CmakeLists.txt`

`>cmake --build project` Build succeeded

Okay we're finally ready to begin reading Chapter 1.

## 1:30 pm


Poking around looking at files.
`deps\bootstrap.json` has https://github.com/KhronosGroup/glTF-Sample-Models
`raptor.natvis` has
```cpp
raptor::Array<T>
raptor::Span<T>
raptor::StringView
raptor::FlatHashMap<K,V>
```

Reading about the 3 layers of the Raptor Engine
- Foundation Layer
- Graphis (Raptor) Layer
- Application Layer

Looking at some files in the **Foundation Layer**

Looking at the TLSF allocator https://github.com/mattconte/tlsf

Looking at `foundatin/array.hpp`.
- [ ] Q: Default ctor takes a nullptr for the allocator, but it needs that allocator, no?

Looking at how Raptor handles files and time. Seems like it checks _MSC_VER and _WIN64 does platform specific stuff (doesnt use `<filesystem>`). The default unit of time is `i64 microseconds`, so converting that to seconds is a division by 1000000.

Reading about the **Graphics Layer**, which contains the **GpuDevice**

- [ ] Q: I wonder if the Application Layer knows about vulkan at all, or if that is completely encapsulated by the Graphics Layer

- [ ] Q: "The swapchain is owned by the GpuDevice"
    - [ ] How does Raptor handle multiple windows?
    - [ ] How does the application/platform/wndproc interact with window/swapchain creation?

Reading how resource pools entries encode an `u16` **index** and a `u16` **generation counter** into a single `u32` **handle**
```cpp
template<typename T> struct Handle { u16 index() const; u16 generation() const; u32 id; };
template<typename T, typename HandleType> { ... };
```
- [ ] Q: I wonder if `HandleType` is the same as `Handle<T>`

Reading about Raptor's Texture Viewer. This reminds me of how Treb Connel implemented a graphics debugger in their engine, with texture viewer, shader timeline, pipline, disassembly, performance, memory, geometry, etc.

Finished reading ch 1.

## 3:09 pm

I actually ran into several other issues trying to get this ch01 exe to run, I've forked the project (https://github.com/kaminate/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition/) and raised some issues.
- https://github.com/PacktPublishing/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition/issues/7
- https://github.com/PacktPublishing/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition/issues/4
- https://github.com/PacktPublishing/Mastering-Graphics-Programming-With-Vulkan-2nd-Edition/issues/3
