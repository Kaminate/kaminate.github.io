---
title: "Probability Part I"
date: 2026-09-27
draft: true
script: "my_script"
---

## Intro

In this post, we will cover the following terms:
- Sample Space
- Outcome (Possible/Realized )
- Event
- Probability Space
- Event Space
- Probability Measure
- Random Variable

## Example: Rolling a die

### Sample Space & Outcome

The **sample space** $\Omega$ is the set of possible values an **outcomes** $\omega$ could take
$$
\Omega = \lbrace 1,2,3,4,5,6 \rbrace
$$
$$
\omega \in \Omega
$$

A generic outcome $\omega$ represents
- before rolling: a **possible outcome**
- after rolling: a **realized outcome**, ie $\omega=5$.

### Event

An **event** $A$ is a set of **possible outcomes**.
$$
A \subseteq \Omega
$$
For example:
- $A = \lbrace 1, 3, 5 \rbrace$ is the event for "roll an odd number"
- $B = \lbrace 5, 6 \rbrace$ is the event for "roll a 5 or higher"
- $C = \lbrace 6 \rbrace$ is the event for "roll a 6"

If the **realized outcome** is $\omega=5$, events $A$ and $B$ occured, and $C$ did not.

$$ \omega \in A $$
$$ \omega \in B $$
$$ \omega \not\in C $$

_Event $A$ occurs exactly when $\omega \in A$._

## Example: Flip a coin

{{<katex>}}
$$
\begin{aligned}
\Omega^{(1)} &= \lbrace H, T \rbrace
\\ \omega^{(1)} &\in \Omega^{(1)}
\\ A^{(1)} &= \lbrace H \rbrace = \text{"result was heads"}
\end{aligned}
$$
{{</katex>}}

## Example: Flip 2 coins

The outcome records in order: (result of 1st flip, result of 2nd flip)

{{<katex>}}
$$
\begin{aligned}
\Omega^{(2)} &= \Big\lbrace ( \omega_1, \omega_2 ) : \omega_1, \omega_2 \in \Omega^{(1)}  \Big\rbrace
\\              &= \Big\lbrace (H, H), (H, T), (T, H), (T, T) \Big\rbrace
\\
\\ \omega^{(2)} &= ( \omega _ 1, \omega_ 2) \in \Omega^{(2)}
\\ A_i^{(2)} &= \Big\lbrace ( \omega_1, \omega_2) \in \Omega^{(2)} : \omega_i \in A^{(1)} \Big\rbrace , i = 1, 2
\end{aligned}
$$
{{</katex>}}

Where $A_1^{(2)}$ is the event for "the 1st flip was Heads"
$$
A_1^{(2)} = \Big\lbrace ( H, H ), ( H , T) \Big\rbrace 
$$
And $A_2^{(2)}$ is the event for "the 2nd flip was Heads"
$$
A_2^{(2)} = \Big\lbrace ( H, H ), ( T, H ) \Big\rbrace 
$$

For example if the **realized outcome** was heads followed by tails, then:
{{<katex>}}
$$
\begin{aligned}
\omega^{(2)} &=(H,T)            \\
\omega^{(2)} &\in A_1^{(2)}     \\
\omega^{(2)} &\notin A_2^{(2)} 
\end{aligned}
$$
{{</katex>}}

## Example: Flip N coins

{{<katex>}}
$$
\begin{aligned}
\Omega^{(N)} &= \Big\lbrace ( \omega _1, ...,  \omega_N ) : \omega_i \in \Omega^{(1)}, i = 1, ..., N \Big\rbrace
\\ \omega^{(N)} &= ( \omega _ 1, ..., \omega_N) \in \Omega^{(N)}
\\ A_i^{(N)} &= \Big\lbrace ( \omega_1, ...,  \omega_N ) \in \Omega^{(N)} : \omega_i \in A^{(1)}  \Big\rbrace
\end{aligned}
$$
{{</katex>}}


## Probability space

A **probability space** is the triple $( \Omega, \mathcal{F}, \mathbb{P})$ which describes likelihoods of **events** in a random experiment
- **Sample space** $\Omega$: Set of **possible outcomes** $\omega$
- **Event space** $\mathcal{F}$: Set of **events**
- **Probability measure** $\mathbb{P}$: A function $\mathbb{P}:\mathcal{F} \to \lbrack 0, 1 \rbrack$ which assigns a probability to each **event**

Following the die roll example, $\mathcal{F} = \lbrace A, B, C, ... \rbrace$, and

{{<katex>}}
$$
\begin{aligned} 
\mathbb{P}(A) &= \mathbb{P}( \lbrace 2, 4, 6 \rbrace ) = \frac{3}{6} = \frac{1}{2}
\\ \mathbb{P}(B) &= \mathbb{P}( \lbrace 5, 6 \rbrace ) = \frac{2}{6} = \frac{1}{3}
\\ \mathbb{P}(C) &= \mathbb{P}( \lbrace 6 \rbrace ) = \frac{1}{6}
\end{aligned} 
$$
{{</katex>}}

## Random Variable

A **Random variable** $X : \Omega \to E$ is a function that represents a theoretical outcomes before an experiement takes place.
**Domain**: Possible outcomes of a sample space $\Omega$  
**Range**: Measurable space $E$  

X : Q -> E

where
Q belongs to measurable space (Q,F), which belongs to probability space (Q,F,P) and
E belongs to measurable space (E, epsilon)

A *random sample* $x$ 






## Triangle

asdf
{{< webgpu canvasID="triangleCanvas" >}}

## Cube

asdf

{{< webgpu canvasID="cubeCanvas" >}}

