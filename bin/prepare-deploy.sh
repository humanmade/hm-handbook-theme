#!/bin/bash

#We make sure we run this just at one before_deploy hook.
if ! [ "$BEFORE_DEPLOY_RUN" ] && [ "$TRAVIS_PHP_VERSION" == "$DEPLOY_BUILD" ]; then

        echo " Preparing deploy. ";

    # Flag the run.
        export BEFORE_DEPLOY_RUN=1;

    # Parse the name of the repo.
        export THEMEISLE_REPO
        THEMEISLE_REPO=$(node -pe "require('./package.json').name")

    # Parse the version of the product.

        export THEMEISLE_VERSION
        THEMEISLE_VERSION=$(node -pe "require('./package.json').version")

    # Parse product category.
        export THEMEISLE_CATEGORY
        THEMEISLE_CATEGORY=$(node -pe "require('./package.json').category")



        export LITE_NAME
        LITE_NAME=$(node -pe "require('./package.json').litename")

        if [ "$LITE_NAME" != "undefined" ]; then
            export DEMO_THEMEISLE_LITE_PATH
            DEMO_THEMEISLE_LITE_PATH="$DEMO_ROOT/wp-content/$THEMEISLE_CATEGORY/$LITE_NAME";
        fi;





        if [ "$THEMEISLE_CATEGORY" == "stack" ]; then
            THEMEISLE_CATEGORY="themes"
        fi;
        export DEMO_THEMEISLE_PATH
        DEMO_THEMEISLE_PATH="$DEMO_ROOT/wp-content/$THEMEISLE_CATEGORY/$THEMEISLE_REPO";

    # Build changelog based on commit message description.
        CHANGELOG="\n ### v$THEMEISLE_VERSION - $(date +'%Y-%m-%d') \n **Changes:** \n";

    # Remove first line from the commit as is it used as commit title.
        NORMALIZED_MESSAGE=$(sed "1d"  <<< "$TRAVIS_COMMIT_MESSAGE");

    # Save changes list in a sepparately variable as we use it in the release body.
        export CHANGES="";
        while read -r line; do
            if ! [ -z "$line" ]; then
                line="${line//[$'\r\n']}";
                export CHANGES=$CHANGES'* '$line'\n';
            fi;
        done <<< "$NORMALIZED_MESSAGE"
        #Check if we have a readme file.
        if [ -f "readme.txt" ]; then
            #Check if we have a Changelog section
            count=$(grep -c '== Changelog ==' "readme.txt")
            if [ "$count" -eq 0 ]; then
                echo "Changelog section not found in readme.txt. Exiting..."
            else
                #Check if the current version is already in the changelog file.
                change_log_line=$(grep -n '== Changelog ==' "readme.txt" | awk -F ':' '{print $1}')
                version_line=$(grep -n "= $THEMEISLE_VERSION " "readme.txt" | awk -F ':' '{print $1}')

                if [[ "$change_log_line" -lt "$version_line" ]]; then
                        echo "Version already mentioned in changelog section in readme.txt. Exiting..."
                else
                    #Save the changelog text into readme file.
                    sed "/== Changelog ==/a \= $THEMEISLE_VERSION - $(date +'%Y-%m-%d')  = \n\n$CHANGES\n" "readme.txt" > "readme.txt.1"
                    mv "readme.txt.1" "readme.txt"
                fi
            fi

        fi
        CHANGELOG="$CHANGELOG $CHANGES";
        echo -e "$CHANGELOG $(cat CHANGELOG.md)" > CHANGELOG.md
        if [ -e "readme.txt" ]
        then
            grunt wp_readme_to_markdown
        fi
    # Run the prepare deployment action

        grunt deploy
fi;