---
title: "Probability Part III"
date: 2026-10-14
draft: false
---

- [Probability Part I]({{< ref "posts/probability-part-1" >}})
- [Probability Part II]({{< ref "posts/probability-part-2" >}})
- [Probability Part III]({{< ref "posts/probability-part-3" >}}) $\leftarrow$ you are here
- [Probability Part IV]({{< ref "posts/probability-part-4" >}})

$$
\gdef\dx{\thinspace \mathrm{d}x}
\gdef\dy{\thinspace \mathrm{d}y}
\gdef\dm{\thinspace \mathrm{d}m}
\gdef\dr{\thinspace \mathrm{d}r}
$$

$\gdef\dx{\thinspace \mathrm{d}x}$
$\gdef\dy{\thinspace \mathrm{d}y}$
$\gdef\dm{\thinspace \mathrm{d}m}$
$\gdef\dr{\thinspace \mathrm{d}r}$


## Intro

Last time, in [Part I]({{< ref "posts/probability-part-1" >}}), and [Part II]({{< ref "posts/probability-part-2" >}}), we covered how the basics of probability, leading up to **random variables** and their use in **Monte Carlo integration**. In this post, we'll explore tuples of random variables, called **joint random variables**, and their distributions.

## Joint Random Variable

A random experiment is modeled by a probability space $(\Omega, \mathcal{F}, \mathbb{P})$. Recall:
- $\Omega$ - Set of outcomes
- $\mathcal{F}$ - Collection of events
- $\mathbb{P}$ - Probability measure on $(\Omega, \mathcal{F})$

Suppose we have two random variables

{{<katex>}}
$$
X : \Omega \to S_X \\[1em]
Y : \Omega \to S_Y
$$
{{</katex>}}

The pair $(X,Y)$ is a **joint random variable**. Given random outcome $\omega \in \Omega$, it takes on the value

$$
\left( X(\omega), Y(\omega) \right) \in S_X \times S_Y
$$

The distribution of $(X,Y)$ is called the **joint distribution**, and is given by
$$
P_{XY}( C ) = \mathbb{P}\left[ (X,Y) \in C \right], \quad  C \subseteq S_X \times S_Y
$$

The distributions of $X$ and $Y$ are called **marginal distributions**, and are given by

{{<katex>}}
$$
\begin{aligned}
P_X( A ) &= \mathbb{P}\left[ X \in A \right]
\\  &= \mathbb{P}\left[ (X,Y) \in A \times S_Y \right], \quad A \subseteq S_X
\\[1em]

P_Y( B ) &= \mathbb{P}\left[ Y \in B \right]
\\  &= \mathbb{P}\left[ (X,Y) \in S_X \times B \right], \quad B \subseteq S_Y
\end{aligned}
$$
{{</katex>}}

Let the joint distribution of $(X,Y)$ be defined by a density function $f_{XY}$, as defined below for the discrete, continuous, and mixed cases.

> Recall again that $\mathbb{P}$ is the probability measure on $(\Omega,\mathcal{F})$, which assigns probabilities to events in $\mathcal{F}$

For $x \in S_X$, $y \in S_Y$, $A \subseteq S_X$, $B \subseteq S_Y$, and $C \subseteq S_X \times S_Y$:

{{<br>}}

| $X$        | $Y$        | Definition of $f_{XY}$                                                                |
| ---        | ---        | ---                                                                                   |
| Discrete   | Discrete   | {{<katex>}} $f_{XY}(x,y) = \mathbb{P}( X=x, Y=y)$                        {{</katex>}} |
| Continuous | Continuous | {{<katex>}} $ \mathbb{P}((X,Y)\in C)      = \iint_C f_{XY}(x,y) \dx \dy$ {{</katex>}} |
| Discrete   | Continuous | {{<katex>}} $ \mathbb{P}(X = x, Y\in B)   = \int_B f_{XY}(x,y) \dy$      {{</katex>}} |
| Continuous | Discrete   | {{<katex>}} $ \mathbb{P}(X \in A, Y = y ) = \int_A f_{XY}(x,y) \dx$      {{</katex>}} |

{{<br>}}

Then the marginal density functions for $X$ and $Y$ can be found in terms of the joint density.

{{<br>}}

| Case              | Marginal Density function                                                         |
| ---               | ---                                                                               |
| $Y$ is discrete   | {{<katex>}} $f_X(x) = \sum_{y \in S_Y} f_{XY}(x,y), \quad x \in S_X$ {{</katex>}} |
| $X$ is discrete   | {{<katex>}} $f_Y(y) = \sum_{x \in S_X} f_{XY}(x,y), \quad y \in S_Y$ {{</katex>}} |
| $Y$ is continuous | {{<katex>}} $f_X(x) = \int_{S_Y} f_{XY}(x,y) \dy, \quad x \in S_X$   {{</katex>}} |
| $X$ is continuous | {{<katex>}} $f_Y(y) =\int_{S_X} f_{XY}(x,y) \dx, \quad y \in S_Y$    {{</katex>}} |
 
## Independence

If $X$ and $Y$ are independent, then

$$
f_{XY}( x, y ) = f_X(x) \thinspace f_Y(y), \quad (x,y) \in S_X \times S_Y.
$$

Now suppose that instead of $X$ and $Y$, we have a sequence $\mathbf{X}$ of $n$ independent random variables $X_i : \Omega \to S$, each taking values in the same set $S$ with common density $g$.

$$
\mathbf{X} = (X_1, \dots, X_n)
$$

Then, the joint density $f_{\mathbf{X}}$ of $\mathbf{X}$ is

$$
f_{\mathbf{X}}(x_1, \dots, x_n) = \prod_{i=1}^n g(x_i), \quad (x_1, \dots, x_n) \in S^n.
$$

We say that $\mathbf{X}$ is a sequence of $n$ **independent, identically distributed** (**IID**) variables, or that $\mathbf{X}$ is a **random sample** of size $n$, where each $X_i$ is a sample draw from common density $g$ with observed value $x_i$.

## Conditional Expected Value

Okay, going back to the joint random variable $(X,Y)$ again. Suppose we observe $X=x$.

For $x \in S_X$ the **conditional probability density function** of $Y$ given $X=x$ is defined

$$
f_Y( y \mid x) = \frac{ f_{XY}(x,y) }{ f_X(x)}, \quad y \in S_Y
$$

For $x \in S_X$ the **conditional expected value** of $Y$ given $X=x$ is defined as

{{<katex>}}
$$
\mathbb{E}( Y \mid X=x) =
\begin{cases}
\displaystyle \sum_{y \in S_Y} y \, f_Y( y \mid x ), & \text{if } Y \text{ is discrete} \\[2em]
\displaystyle \int_{S_Y} y \, f_Y( y \mid x ) \dy,   & \text{if } Y \text{ is continuous}
\end{cases}
$$
{{</katex>}}

Now the function $v$ is the **regression function** of $Y$ based on $X$
$$
v(x) = \mathbb{E}(Y \mid X=x)
$$

And if we plug $X$ into the regression function, we get a random variable $v(X)$, called the **conditional expected value** , called the **conditional expected value** of $Y$ given $X$, denoted $\mathbb{E}(Y \mid X)$.

{{<katex>}}
$$
v(X) = \mathbb{E}(Y \mid X) =
\begin{cases}
\displaystyle \sum_{y \in S_Y} y \, f_Y( y \mid X ),  & \text{if } Y \text{ is discrete} \\[2em]
\displaystyle \int_{S_Y} y \, f_Y( y \mid X ) \dy,    & \text{if } Y \text{ is continuous}
\end{cases}
$$
{{</katex>}}


## Fundamental Property

The fundamental property of the random variable $\mathbb{E}(Y \mid X)$ is, for every function $r : S_X \to \mathbb{R}$,

{{<katex>}}
$$
\begin{aligned}
\boxed{\mathbb{E}_{f_X}\left[ r(X) \, \mathbb{E}(Y \mid X) \right]}
&= \int_{S_X} r(x) \, \mathbb{E}(Y \mid X = x) \, f_X(x) \, \dx \\
&= \int_{S_X} r(x) \left( \int_{S_Y} y \, f_Y(y \mid x) \, \dy \right) f_X(x) \, \dx \\
&= \int_{S_X} \int_{S_Y} r(x) \, y \, f_{XY}(x, y) \, \dy \, \dx \\
&= \boxed{\mathbb{E}\left[ r(X) \, Y \right]}
\end{aligned}
$$
{{</katex>}}

## Coming up next

In [Part IV]({{< ref "posts/probability-part-4" >}}) we will look at sampling using the **inversion method**, **importance sampling**, and **importance resampling**.

## Sources

- [Joint Distributions - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/03:_Distributions/3.04:_Joint_Distributions)

- [Conditional Expected Value - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/04:_Expected_Value/4.07:_Conditional_Expected_Value)