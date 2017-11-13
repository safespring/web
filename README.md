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

### Using Docker

1. Make sure you have [Docker installed][2].
2. Clone the git repository and run Docker:
   ```
   git clone git@github.com:safespring/web
   cd blog
   docker run --rm -it -p 1313:1313 -v $PWD:/site:z -e VIRTUAL_HOST="${1}" devopsdays/docker-hugo-server
   ```
3. Access http://localhost:1313/ in your browser of choice.

[2]:https://www.docker.com/community-edition#/download

## Notes for theme development

* The current theme is located in `themes/safespring` and is a copy of the [Type theme][3].
* Detailed information about customizing and creating themes and templates are found at the [Hugo documentation site][4].

[3]: https://github.com/digitalcraftsman/hugo-type-theme
[4]: https://gohugo.io/themes/customizing/
