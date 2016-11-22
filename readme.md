## Development Guidelines


* Theme styles use SCSS and are stored in `assets/src/styles`.
* Theme JavaScript files are in `assets/src/scripts`.
* Theme Images files are in `assets/src/images`.

The theme uses [gulp](http://gulpjs.com) to run various tasks such as compiling CSS, bundling JS and minifiying images. 

* Compiled/proccessed files are not tracked in git and MUST be built locally and on deploy.
* All compiled/proccessed assets are be kept in `assets/dist`. 
* Always load assets from `assets/dist`, you probably shouldn't be loading anything from `assets/src`.

### Dev Setup

**Dependencies**

* A development environment and working WordPress install. e.g. [Salty Wordpress](https://github.com/humanmade/Salty-WordPress)
* [git](https://git-scm.com)
* [NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
* [Gulp CLI](http://gulpjs.com/)

**Getting it setup**

1. Check out the code to the `themes` directory of your WordPress install. `git checkout --recursive git@github.com:humanmade/hm-handbook-theme.git`
1. If you didn't pass `--recursive` in the previous step, you need to make sure you run `git submodule update --recursive --init` from inside the hm-handbook-theme directory to pull down the submodules that are used in this theme.
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
