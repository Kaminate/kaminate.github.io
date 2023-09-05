---
title: "Website Setup"
date: 2020-01-01
---


The website source is stored (for free!) using github pages at https://github.com/Kaminate/kaminate.github.io.
Posts are written in `.md` format, and converted to static html using `hugo`.

# Initial Website Setup

## Create github repository

I'm going to assume you're familiar with [github](https://github.com). To host a website on GitHub Pages, create a repository `https://github.com/<username>/<username>.github.io`. For me, this is https://github.com/kaminate/kaminate.github.io

## Install Hugo
If you're like me, you have no idea what [Hugo](https://gohugo.io) is, but you're following the docs to create a new hugo skeleton website in the repository directory.
```sh
hugo new site . --force

```

For the website theme, I chose one called `PaperMod`.
```sh
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive 
```

Edit the config file, it was created from the `hugo new site` call earlier. It may be one of `config.toml`, `hugo.json`, `hugo.yaml`, etc. For me it was **`hugo.toml`**

Add a line to the hugo config file to choose the PaperMod theme
```toml
theme = 'PaperMod'
```

### Preview the website
```sh
hugo serve
```

Note that by default, Hugo seems to create .md pages with `draft = true`, so you won't be able to see them unless you use `-D` arg. (and when you publish your website and can't find a post, it's because you didn't set `draft = false`)

```sh
hugo serve -D
```

## Hosting and Deployment

Change site name. In `hugo.toml`, I changed some lines
```toml
baseURL = 'http://example.org/'
title = 'My New Hugo Site'
```
to
```toml
baseURL = 'http://kaminate.github.io'
title = 'n4735 n0735'
```

I originally tried to use two repositories, one to version the content .md files, and the other to version the built static html, but I ended only needing one repository, because the built static html is created by a github action (more on that later).

on github, went to settings → pages → build and deployment → source → github actions
this created a `.github\workflows\hugo.yml` so that when a commit goes to main branch, the website is published to https://kaminate.github.io

Test to see if the github action deployment works at all by creating a post and pushing it (we are already in the main branch)
```sh
hugo new posts/test-post.md
```

Remove the `draft: true` from `website/content/posts/test-post.md`
```md
draft: false
```

and push main to trigger the github action
```sh
git add .
git commit -m asdf
git push
```


Spend a couple hours debugging the `Build with Hugo` github action due to the the error
```
Error: Unable to locate config file or config directory. Perhaps you need to create a new site.
```
Turns out the hugo version listed in the github action's `hugo.yml` is different than your my hugo version, and you should have copied `.github/workflows/hugo.yaml` from https://gohugo.io/hosting-and-deployment/hosting-on-github/ instead.

# LaTeX
Based off of https://adityatelange.github.io/hugo-PaperMod/posts/math-typesetting/ and https://mertbakir.gitlab.io/hugo/math-typesetting-in-hugo/


Created [layouts/partials/katex.html](https://github.com/Kaminate/kaminate.github.io/tree/main/layouts/partials/katex.html), which contains code copied from ["Auto-render Extension"](https://katex.org/docs/autorender.html).
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js" integrity="sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>
```

Created [layouts/partials/extend_head.html](https://github.com/Kaminate/kaminate.github.io/tree/main/layouts/partials/extend_head.html) to include it in every post.
```html
{{ partial "katex.html" . }}
```

And just like that, inline and block math work.

`Inline math: \\( \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… \\)`

Inline math: \\( \varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887… \\)

`Block math: $$ \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } $$`

Block math: $$ \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } } $$

I wanted to have inline math with `$ <latex here> $`, so I appeneded another delimiter to the `renderMathInElement` function in
[layouts/partials/katex.html](https://github.com/Kaminate/kaminate.github.io/blob/main/layouts/partials/katex.html)
```html
<script>
  document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {delimiters: [
        {left: "$", right: "$", display: false} ] }); });
</script>
```
Apparently this is mentioned in the second katex documentation https://katex.org/docs/autorender.html, `display: false` means inline (non-block) latex rendering.

When I tried to have column vectors, the backslashes `\\` would escape into `\`,
making me write with four of them.
```
a = \begin{bmatrix} x  \\\\ y \end{bmatrix} /* <-- gross */
a = \begin{bmatrix} x  \\ y \end{bmatrix} /* <-- ideal */
```
$$
a_{row} = \begin{bmatrix} x  \\ y \end{bmatrix}
$$
$$
{{<katex>}}
a_{col} = \begin{bmatrix} x  \\ y \end{bmatrix}
{{</katex>}}
$$

I looked at a couple links and found a solution
-   https://danmackinlay.name/notebook/hugo.html
-   https://discourse.gohugo.io/t/how-to-render-math-equations-properly-with-katex/40998/4
-   https://misha.brukman.net/blog/2022/04/writing-math-with-hugo/

I added [layouts/shortcodes/katex.html](https://github.com/Kaminate/kaminate.github.io/blob/main/layouts/shortcodes/katex.html) and now wrap katex code in a [shortcode](https://gohugo.io/content-management/shortcodes/). I don't claim to understand how it works, apparently it has something to do with forwarding the `\\` from markdown to rendering.

# Tweaks

## GitIgnore

Create `.gitignore` file, and add some hugo build file to it
```text
.hugo_build.lock
```
Also remove static html from being pushed in case it was ever generated
```text
public/
```

## Remove the Footer

Remove the `Powered by Hugo and PaperMod` footer  
I found an example at https://github.com/wowchemy/wowchemy-hugo-themes/issues/1389. In this issue, they used `site_footer.html`, but with PaperMod it seems `footer.html` sort of works, except that it breaks the light/dark toggle. Looking inside `themes/PaperMod/layouts.partials/footer.html`, there's a line for `{{- if not (.Param "hideFooter") }} `, so adding that to `hugo.toml` is better.

## Icon

Drop an image named `favicon.ico` into `static/`

## Social Media Icons

Add social media icons  
When adding the social media icons to `hugo.toml`, because it's basically a config file, typos go undetected.
```toml
[[params.socalIcons]]
name = "twitter"
url = "https://twitter.com/n8tak"
```
(socialIcons is misspelled as socalIcons)

# Comments

I used https://utteranc.es, relevant files are [layouts/partials/utterances.html](https://github.com/Kaminate/kaminate.github.io/tree/main/layouts/partials/utterances.html), [layouts/partials/comments.html](https://github.com/Kaminate/kaminate.github.io/tree/main/layouts/partials/comments.html), and allowing comments in `hugo.toml`
```toml
[params]
comments = "true"
```

# Table of Contents

asdf asdf asdf 


# References

- https://github.com/adityatelange/hugo-PaperMod/
- https://github.com/adityatelange/hugo-PaperMod/tree/exampleSite
- https://github.com/adityatelange/hugo-PaperMod/wiki/Features
- https://adityatelange.github.io/hugo-PaperMod/
- https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-features/

