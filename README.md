# website

contains source code for kaminate.github.io


## How website was created


Create new hugo skeleton website in current directory
```
hugo new site . --force

```


Download a theme, I like PaperMod
```

git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```

Edit the config file, it was created from the `hugo new site` call
earlier. It may be one of `config.toml`, `hugo.json`, `hugo.yaml`, etc.
For me it was `hugo.toml`

Add a line to the hugo config file to choose the PaperMod theme
```
theme = 'PaperMod'
```

Preview the website
```
hugo server
```

(Controversial) Remove the footer (Powered by Hugo and PaperMod)
https://github.com/wowchemy/wowchemy-hugo-themes/issues/1389
In this issue, they used `site_footer.html`, but with PaperMod it seems
`footer.html` works


Change site name
In `hugo.toml`, I changed some lines
```
baseURL = 'http://example.org/'
title = 'My New Hugo Site'
```
to
```
baseURL = 'http://kaminate.github.io'
title = 'n4735 n0735'
```


Create a .gitignore file, and add some hugo build file to it
```
.hugo_build.lock
```

Trying to deploy from this repository (kaminate/website)
to github pages (kaminate/kaminate.github.io)

https://github.com/Kaminate/website/settings/pages
both repositories need to be public
on github, went to settings --> pages --> build and deployment --> source --> github actions
this created a `.github\workflows\hugo.yml` so that when a commit goes to main branch, the website is published in kaminate.github.io repo

Test the deployment by creating a post and pushing it (we are already in main)
```
hugo new posts/test-post.md
git add .
git commit -m asdf
git push
```

Remove the `draft: true` from `website/content/posts/test-post.md`
```
draft: false
```

wtf



