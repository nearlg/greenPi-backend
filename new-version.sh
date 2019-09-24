#!/bin/bash
# if [ "$TRAVIS_BRANCH" == "master" ]; then
#     mkdir deploy;
#     cp -r !(deploy|README.md|node_modules|composer.*) deploy/;
#     zip -r deploy.zip deploy;
# fi
BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)
echo "TRAVIS_BRANCH=$TRAVIS_BRANCH, PR=$PR, BRANCH=$BRANCH"
if [ "$TRAVIS_BRANCH" != "develop" ]; then
    exit 0
fi
echo "HERE!!"
# BRANCH="feature/major/something"
if [[ "$BRANCH" =~ feature\/major\/.+ ]]; then echo "MAJOR + 1";
elif [[ "$BRANCH" =~ feature\/minor\/.+ ]]; then echo "MINOR + 1";
else echo "PATCH + 1"; fi
