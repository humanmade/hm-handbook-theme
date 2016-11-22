## Development Guidelines

The theme uses gulp to run various tasks. This includes compiling CSS, bundling JS and minifiying images.

* Theme styles use SCSS and are stored in `assets/src/styles`.
* Theme JavaScript files are in `assets/src/scripts`. Webpack is used to bundle theme.js.
* Theme Images files are in `assets/src/images`.
* Compiled/proccessed are be kept in `assets/dist`.
* You should never include files from `assets/src` directly within the theme.


1. Make sure you run `git submodule update --recursive --init` in the theme folder to pull down the vendor submodules that are used in this theme.
1. Reqirements: [NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm) and [Gulp CLI](http://gulpjs.com/)
1. `npm install` to install all required dependencies.
1. `gulp` to run all the tasks required to build the theme.
1. `gulp watch` to watch for changes, and run required tasks automatically.

### Updating HM Pattern Library

The pattern library is a submodule checked out to `/vendor/hm-pattern-library`. We are using the compiled version of this so you should check out either a tagged release or the `gh-pages` branch when updating.

Example of what needs to be done: 

1. `cd vendor/hm-pattern-library`
1. `git fetch --tags && git checkout 1.0` or `git checkout gh-pages && git pull`
1. `cd ../../`
1. `git add vendor/hm-pattern-library && commit -m 'Update HM Pattern Library'`
