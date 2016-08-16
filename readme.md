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
