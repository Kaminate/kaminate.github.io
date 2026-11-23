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
X : \Omega \to S \\[1em]
Y : \Omega \to T
$$
{{</katex>}}

The pair $(X,Y)$ is a **joint random variable**. Given random outcome $\omega \in \Omega$, it takes on the value

$$
\left( X(\omega), Y(\omega) \right) \in S \times T
$$

The distribution of $(X,Y)$ is called the **joint distribution**, and is given by
$$
\mathbb{P}\left[ (X,Y) \in C \right] \text{ for } C \subseteq S \times T
$$

The distributions of $X$ and $Y$ are called **marginal distributions**, and are given by


{{<katex>}}
$$
\mathbb{P}\left[ X \in A \right] \text{ for } A \subseteq S = \mathbb{P}\left[ (X,Y) \in A \times T \right] \text { for } A \subseteq S
\\[1em]
\mathbb{P}\left[ Y \in B \right] \text{ for } B \subseteq T = \mathbb{P}\left[ (X,Y) \in S \times B \right] \text { for } B \subseteq T
$$
{{</katex>}}

Let the joint distribution of $(X,Y)$ be defined by a function $f$, as shown below for the discrete, continuous, and mixed cases.

For $x \in S$, $y \in T$, $A \subseteq S$, $B \subseteq T$, and $C \subseteq S \times T$:

{{<br>}}

| $X$        | $Y$        | $f(x,y)$                                                                            |
| ---        | ---        | ---                                                                                 |
| Discrete   | Discrete   | {{<katex>}}$\mathbb{P}( X=x, Y=y)$                                     {{</katex>}} |
| Continuous | Continuous | {{<katex>}}$\mathbb{P}((X,Y)\in C) = \iint_C f(x,y) \dx \dy$           {{</katex>}} |
| Discrete   | Continuous | {{<katex>}}$\mathbb{P}(X = x, Y\in B) = \int_B f(x,y) \dy$             {{</katex>}} |
| Continuous | Discrete   | {{<katex>}}$\mathbb{P}(X \in A, Y = y ) = \int_A f(x,y) \dx$           {{</katex>}} |

 
## Coming up next

In [Part IV]({{< ref "posts/probability-part-4" >}}) we will look at sampling using the **inversion method**, **importance sampling**, and **importance resampling**.

## Sources

- [Joint Distributions - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/03:_Distributions/3.04:_Joint_Distributions)

- [Conditional Expected Value - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/04:_Expected_Value/4.07:_Conditional_Expected_Value)