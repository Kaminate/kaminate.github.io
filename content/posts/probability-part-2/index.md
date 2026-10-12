---
title: "Probability Part II"
date: 2026-10-11
draft: true
---

- [Probability Part I]({{< ref "posts/probability-part-1" >}})
- [Probability Part II]({{< ref "posts/probability-part-2" >}}) $\leftarrow$ you are here

## Intro

Last time, in [Part I]({{< ref "posts/probability-part-1" >}}), we covered the basic concepts leading up to **random variables** and their distributions. In this post, things will start to get cracking as we build up to the **law of the unconscious statistician**, the **law of large numbers**, **Monte Carlo integration**, and **importance sampling**. Along the way, we'll introduce the following terms:

{{<br>}}

| Term                                         | Notation                        |
| ---                                          | :---:                           |
| Expected Value of $X$ under distribution $p$ | $\mathbb{E}_p[X]$               |
| Variance of $X$ under distribution $p$       | $\mathbb{V}_p[X]$               |
| $X$ follows distribution $p$                 | $X \sim p$                      |

## Expected Value

The **expected value** $\mathbb{E}_p[X]$ of a **random variable** $X$ with distribution $p$ is the probability-weighted average of its possible values. Intuitively, it represents the average value we would observe over many _independent_ repetitions of the same experiment. The **expected value** of $X$ is also called the _mean_ of the distribution of $X$ and is frequently denoted $\mu$.

{{<br>}}

For a discrete **random variable**: 

{{<katex>}}
$$
\mathbb{E}_p[X] = \sum_x x \,  p(x)
$$
{{</katex>}}

The sum is taken over all possible values $x$ of $X$. Here, $p(x)$ is the **probability mass function** (PMF) $p_X(x)$, the probability that $X=x$.

{{<br>}}

For a continuous **random variable**:


{{<katex>}}
$$
\mathbb{E}_p[X] = \int x \,  p(x) \, dx
$$
{{</katex>}}

The integral is taken over all possible values $x$ of $X$. Here, $p(x)$ is the **probability density function** (PDF) $f_X(x)$, the probability density at $x$.

### Example: Fair Die

Let's get the **expected value** of a fair die roll.

{{<br>}}

First, let $S=T=\lbrace 1,2,3,4,5,6 \rbrace$ and define our **random variable** $X : S \to T$ as an identity mapping. The measurement $X(s) = s $ is simply the number rolled.

{{<br>}}

Since the die is fair, the **PMF** $p(x) = \dfrac{1}{6}$ for each possible value of $x$. The **expected value** is:

{{<katex>}}
$$
\begin{aligned}
\mathbb{E}_p[X] &= \sum_x x \,  p(x)                   \\[10px]
                &= ( 1 )( \frac{1}{6} ) + 
                   ( 2 )( \frac{1}{6} ) + 
                   ( 3 )( \frac{1}{6} ) + 
                   ( 4 )( \frac{1}{6} ) + 
                   ( 5 )( \frac{1}{6} ) + 
                   ( 6 )( \frac{1}{6} )                \\[10px]
                &= \frac{ 1 + 2 + 3 + 4 + 5 + 6 }{ 6 } \\[10px]
                &= \frac{ 21 }{ 6 }\\[10px]
                &= 3.5
\end{aligned}
$$
{{</katex>}}

Although we can't actually roll the value $3.5$, it represent the average value we would approach over many indepedent rolls.

### Example: Weighted Die

Now let's say we're gambling for money, and higher rolls win.  To give give ourselves a little bit of a unfair advantage, we bring out a weighted die where the probability of rolling a $6$ is twice as likely as rolling any of the other numbers.

{{<katex>}}
$$
p(x) = \begin{cases}
            \dfrac{1}{7}, \, x \in \lbrace 1, 2, 3, 4, 5 \rbrace \\[15px]
            \dfrac{2}{7}, \, x = 6 
          \end{cases}
$$
{{</katex>}}

The **expected value** is then:
{{<katex>}}
$$
\begin{aligned}
\mathbb{E}_p[X] &= \sum_x x \,  p(x)                     \\[10px]
                &= ( 1 )( \frac{1}{7} ) + 
                   ( 2 )( \frac{1}{7} ) + 
                   ( 3 )( \frac{1}{7} ) + 
                   ( 4 )( \frac{1}{7} ) + 
                   ( 5 )( \frac{1}{7} ) + 
                   ( 6 )( \frac{2}{7} )                  \\[10px]
                &= \frac{ 1 + 2 + 3 + 4 + 5 + 2(6)}{ 7 } \\[10px]
                &\approx 3.86
\end{aligned}
$$
{{</katex>}}

So our weighted die has an **expected value** of approximately $3.86$, a little higher than the fair die's **expected value** of $3.5$.


### Example: Dart throw

Now let's look at the **expected value** of a continuous **random variable**. We're going to reuse the [dart throwing experiment]({{< ref "posts/probability-part-1/#continuous-random-variable" >}}) from part 1, where a dart lands uniformly over the area of a circular target of radius $R$. The **random variable** $X$ measures the distance from the bullseye, and we've already derived the PDF $p(r)$ as:

{{<katex>}}
$$
p(r) = \begin{cases}
            \dfrac{2r}{R^2}, \quad 0 < r < R \\[10px]
            0, \quad \text{otherwise}
          \end{cases}
$$
{{</katex>}}

The **expected value** $\mathbb{E}_p[X]$ is calculated as follows:

{{<katex>}}
$$
\begin{aligned}
\mathbb{E}_p[X] &= \int _0^R r \,  p(r) \, dr \\[10px]
                &= \int _0^R r \,  ( \frac{2r}{R^2} )  \, dr \\[10px]
                &= \frac{2}{R^2} \int _0^R r^2  \, dr     \\[10px]
                &= \frac{2}{R^2} \left[ \frac{r^3}{3} \right] _0^R  \\[10px]
                &= \frac{2}{R^2} ( \frac{R^3}{3}      ) \\[10px]
                &= \frac{2}{3} R
\end{aligned}
$$
{{</katex>}}

So on average, we would expect the dart to land two-thirds of the way from the center to the edge.

## Law of Large Numbers

If we _sample from the distribution of $X$_, that is re-run the same experiment independently, we create a sequence of **random variables** $(X_1, X_2, \dots)$ each with the same distribution as $X$. The _sample mean_ $\overline{X}_n$ after $n$ runs is:

$$
\overline{X}_n = \frac{1}{n} \sum _{i=1}^n X_i
$$

$\overline{X}_n$ is itself a **random variable**, whose realized value is the average of the realized values of $X_1, \dots, X_n$.

{{<br>}}

The **law of large numbers** (LLN) informally states that:


{{<katex>}}
$$
\text{As } n \rightarrow \infty, \, \overline{X}_n \text{ converges to } \mathbb{E}_p[X]
$$
{{</katex>}}


## Law of the Unconscious Statistician

The **law of the unconscious statistician** (LOTUS) is a theorem for finding the **expected value** of a _function_ of a **random variable**, using the distribution of the original **random variable**. It is so named because people often use it without consciously realizing that it requires a theorem. Given a function $g(X)$ of a **random variable** $X$, the discrete case is:

{{<katex>}}
$$
\mathbb{E}_p[g(X)] = \sum_x g(x) \, p(x)
$$
{{</katex>}}

And the continuous case is:

{{<katex>}}
$$
\mathbb{E}_p[g(X)] = \int g(x) \, p(x) \, dx
$$
{{</katex>}}


## Variance


## Sources


- [Definitions and Basic Properties - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/04%3A_Expected_Value/4.01%3A_Definitions_and_Basic_Properties)


- [Variance - Kyle Siegrist, LibreTexts](https://stats.libretexts.org/Bookshelves/Probability_Theory/Probability_Mathematical_Statistics_and_Stochastic_Processes_(Siegrist)/04%3A_Expected_Value/4.03%3A_Variance)
