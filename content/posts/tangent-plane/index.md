---
title: "Tangent Plane"
date: 2021-11-01
draft: true
---

Let's say that you have a surface given by $z=f(x,y)$. This could represent a terrain heightmap in a videogame, for example.

![alt text](graph.png)

You want to find the tangent plane to that surface at a given point $p_0 = (x_0, y_0, z_0)$. There are two tangent plane equations to choose from.

The __explicit__ equation
{{<katex>}}
$$
z = f(x_0, y_0) + f_x(x_0, y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0) \\
$$
{{</katex>}}

Or the __implicit__ equation

$$
0 = \nabla f \cdot (p - p_0 )
$$
> note: $p = (x, y, z)$

### What's the difference?


If you have a scalar function $g(x,y,z)$, you can define a couple things from its scalar field
- A __level set__ of a function $g(x,y,z)$ and a constant $C$ is the set of points in space that share the same value $C$. This is given by $g(x,y,z)=C$, where C is a constant. Different constants result in different level sets.
- The equation $g(x,y,z)=C$ represents an __isosurface__.  
  Every point on this surface has a value of C.
An isosurface is always a level set, but a level set is not necessarily an isosurface. The set of points in a level set may may not form a surface, or the level set may not even be in 3D, ie: $f(x,y)=C$
- The equation $g(x,y,z)=0$ represents an __implicit surface__, an isosurface with $C=0$



---

The __gradient__ of a function $g(x,y,z)=C$ at a point is equal to its normal.

### Quick proof


<!--Parameterize a curve on the surface $r(t)=( x(t), y(t) , z(t) )$ -->
Let there be a parametric curve $r$ that lies on the surface of g

{{<katex>}}
$$
r(t)=\begin{bmatrix} x(t) \\ y(t) \\ z(t) ) \end{bmatrix}
$$
{{</katex>}}

Apply multivariable chain rule to the implicit surface $\frac{d}{dt}g(r(t))=0$

$$
\frac{\partial g}{\partial x}  \frac{dx}{dt} + \frac{\partial g}{\partial y}  \frac{dy}{dt} + \frac{\partial g}{\partial z}  \frac{dy}{dz} = 0
$$

$$
\nabla g \cdot r^{\prime}= 0
$$

This tells us that the gradient at a point $\nabla g(x_0, y_0,z_0)$ is orthogonal to the tangent vector $r^{\prime}(x_0,y_0,z_0)$ to a curve that passes through that point on the surface

---

The implicit surface $g(x,y,z) = 0$ represents the same surface as $z=f(x,y)$ by setting

$$
g(x,y,z)=f(x,y)-z
$$

Then the normal $n$ is given by $\nabla g(x,y,z)$

{{<katex>}}
$$
\begin{align*}
n &= \nabla g \\
n &= \nabla ( f-z ) \\
n &= \begin{bmatrix} f_x  \\ f_y  \\ -1 \end{bmatrix}
\end{align*}
$$
{{</katex>}}

The equation of a plane is {{<katex>}}$(\begin{bmatrix} x \\ y \\ z \end{bmatrix} -\begin{bmatrix} x_0 \\ y_0 \\ z_0 \end{bmatrix})\cdot n = 0${{</katex>}}

Expanding it out, we have
{{<katex>}}
$$
(\begin{bmatrix} x \\ y \\ z \end{bmatrix} -\begin{bmatrix} x_0 \\ y_0 \\ z_0 \end{bmatrix})\cdot \begin{bmatrix} f_x  \\ f_y  \\ -1 \end{bmatrix} = 0 
$$

$$
f_x(x-x_0)+ f_y(y-y_0) + (-1)(z-z_0) =0 
$$

$$
z = z_0 + f_x(x-x_0)+ f_y(y-y_0) 
$$
{{</katex>}}
Which is the explicit tangent plane equation from the beginning.

### Example

`<insert example here>`
`<insert thing with  (dx,0,dz) here>`

### References

- https://piazza.com/class_profile/get_resource/ielue3w9x1trv/igpjc2b9y2k1f9
- https://tutorial.math.lamar.edu/classes/calciii/DirectionalDeriv.aspx
- https://tutorial.math.lamar.edu/classes/calciii/gradientvectortangentplane.aspx





