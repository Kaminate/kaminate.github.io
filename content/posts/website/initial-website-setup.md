---
title: "Initial Website Setup"
date: 2023-06-30T20:41:20-07:00
---

### Summary
The website source is stored (for free!) using github pages at https://github.com/Kaminate/kaminate.github.io.
Posts are written in `.md` format, and converted to static html using `hugo`.

### Create github repository

I'm going to assume you're familiar with [github](https://github.com). To host a website on GitHub Pages, create a repository `https://github.com/<username>/<username>.github.io`. For me, this is https://github.com/kaminate/kaminate.github.io

### Hugo
If you're like me, you have no idea what [Hugo](https://gohugo.io) is, but you're following the docs to create a new hugo skeleton website in the repository directory.
```bat
hugo new site . --force

```

For the website theme, I chose one called `PaperMod`.
```bat
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive 
```

Edit the config file, it was created from the `hugo new site` call earlier. It may be one of `config.toml`, `hugo.json`, `hugo.yaml`, etc. For me it was **`hugo.toml`**

Add a line to the hugo config file to choose the PaperMod theme
```toml
theme = 'PaperMod'
```

### Preview the website
```bat
hugo server
```



### Hosting and Deployment


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
```bat
hugo new posts/test-post.md
```

Remove the `draft: true` from `website/content/posts/test-post.md`
```md
draft: false
```

and push main to trigger the github action
```bat
git add .
git commit -m asdf
git push
```


Spend a couple hours debugging the `Build with Hugo` github action due to the the error
```
Error: Unable to locate config file or config directory. Perhaps you need to create a new site.
```
Turns out the hugo version listed in the github action's `hugo.yml` is different than your my hugo version, and you should have copied `.github/workflows/hugo.yaml` from https://gohugo.io/hosting-and-deployment/hosting-on-github/ instead.

### Misc tweaks

-   .gitignore  
    Create `.gitignore` file, and add some hugo build file to it
    ```text
    .hugo_build.lock
    ```
    Also remove static html from being push in case it was ever generated
    ```text
    public/
    ```

-   Remove the `Powered by Hugo and PaperMod` footer (_controversial_)  
    I found an example at https://github.com/wowchemy/wowchemy-hugo-themes/issues/1389. In this issue, they used `site_footer.html`, but with PaperMod it seems `footer.html` works

-   Icon  
    Drop an image named `favicon.ico` into `static/`

-   Add social media icons  
    One more thing - when adding the social media icons to `hugo.toml`, because it's basically a config file, typos go undetected.
    ```toml
    [[params.socalIcons]]
    name = "twitter"
    url = "https://twitter.com/n8tak"
    ```
    (socialIcons is misspelled as socalIcons)

### For future reference

- https://github.com/adityatelange/hugo-PaperMod/
- https://github.com/adityatelange/hugo-PaperMod/tree/exampleSite
- https://adityatelange.github.io/hugo-PaperMod/
- https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-features/


