#!/bin/bash
# if [ "$TRAVIS_BRANCH" == "master" ]; then
#     mkdir deploy;
#     cp -r !(deploy|README.md|node_modules|composer.*) deploy/;
#     zip -r deploy.zip deploy;
# fi
BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)
echo "TRAVIS_BRANCH=$TRAVIS_BRANCH, PR=$PR, BRANCH=$BRANCH"