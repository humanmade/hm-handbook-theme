#!/bin/bash

# We run this on PR or on push to MASTER_BRANCH.
if [ "$TRAVIS_PULL_REQUEST" != "false" ] ||  ( [ "$TRAVIS_EVENT_TYPE" == "push" ] && [ "$TRAVIS_REPO_SLUG" == "$UPSTREAM_REPO" ] && [ "$TRAVIS_BRANCH"  == "$MASTER_BRANCH" ]  && [ "$TRAVIS_PHP_VERSION" == "$DEPLOY_BUILD" ] ) ; then

    phpenv config-rm xdebug.ini

    ./"$HOME/.nvm/nvm.sh"
    nvm install v8.9.0
    nvm use v8.9.0

    npm install
    npm install grunt-cli -g

    phpenv local 5.6

    if [ -f "composer.json" ]; then
        composer selfupdate 1.0.0 --no-interaction
        travis_retry composer install --no-interaction --prefer-dist --ignore-platform-reqs
    fi


    mv node_modules/.bin/which node_modules/.bin/which.backup
    rvm install 2.2.0 && rvm use 2.2.0
    mv node_modules/.bin/which.backup node_modules/.bin/which
    gem install sass
    phpenv local --unset

fi;
# We dont install PHPCS if is not a PR.
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then

          export PATH="$HOME/.composer/vendor/bin:$PATH"

          if [ -f "phpcs.xml" ]; then
              # Install PHPCS.
              composer global require "squizlabs/php_codesniffer=2.9.0"

              # Install WPCS standards.
              git clone -b master --depth 1 https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git "$HOME/wordpress-coding-standards"
              phpenv rehash
              phpcs --config-set installed_paths "$HOME/wordpress-coding-standards"
              phpenv rehash

          fi;

          if [ -f "phpunit.xml" ]; then
              # Install wordpress for testing.
              bash bin/install-wp-tests.sh wordpress_test root '' localhost "$WP_VERSION"

              # Use phpunit 5.7 as WP dont support 6.
              if [[ ${TRAVIS_PHP_VERSION:0:2} == "7." ]]; then
                composer global require "phpunit/phpunit=5.7.*" ;
              fi;
          fi;
fi;