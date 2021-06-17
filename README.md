# Safespring web

This repository contains the source code and Markdown content to generate our
website at https://www.safespring.com/

## Building a preview of the site

### Using the Hugo binary

1. [Download and copy][1] the Hugo binary to your`$PATH`.
2. Clone the git repository and run Hugo:
   ```
   git clone git@github.com:safespring/web
   cd web
   hugo serve
   ```
3. Access http://localhost:1313/blog in your browser of choice.

[1]: https://gohugo.io/overview/installing/

### Using Docker as a server

1. Make sure you have [Docker installed][2].
2. Clone the git repository and run Docker:
   ```
   git clone git@github.com:safespring/web
   cd blog
   # updated version https://hub.docker.com/r/klakegg/hugo/
   docker run --rm -it -v $(pwd):/src -p 1313:1313 klakegg/hugo server
   # old version
   #docker run --rm -it -p 1313:1313 -v $PWD:/site:z -e VIRTUAL_HOST="${1}" devopsdays/docker-hugo-server
   ```
3. Access http://localhost:1313/ in your browser of choice.

[2]:https://www.docker.com/products/container-runtime#/download

## Notes for theme development

* The current theme is located in `themes/safespring` and is a copy of the [Type theme][3].
* Detailed information about customizing and creating themes and templates are found at the [Hugo documentation site][4].

[3]: https://github.com/digitalcraftsman/hugo-type-theme
[4]: https://gohugo.io/themes/customizing/

### more notes

Hugo has a feature where you can redirect old links to new ones. I used it on a personal blog earlier this year.

So for example, `Cleverlaziness.com/post/Automating%20RSS%20Feeds%20With%20IFTTT/` can redirect to `Cleverlaziness.com/2017/07/31/automating-rss-feeds-with-ifttt/`

Yeah, I can work it into the page and the design template. (edited)


[18:45]
So if any changes happen to the structure of the page, users can still use their old links


[18:45]
Not sure if that’s addresses your concerns.


bruvik
[18:47]
I think that will work


Juan Villela [18:51]
Cool. The code is quite simple, too. Just add this to the blog post MD file frontmatter:
```-aliases = [
-    "/old-link/",
-    "/new-link/"```
