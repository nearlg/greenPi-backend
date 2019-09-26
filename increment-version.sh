#!/bin/bash
# echo "$1 ---- base branch!!"
# echo "$2 ---- head branch!!"
# BASE_BRANCH=$1
# HEAD_BRANCH=$2
# # BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)
# # echo "TRAVIS_BRANCH=$TRAVIS_BRANCH, PR=$PR, BRANCH=$BRANCH"

# # if [ "$BASE_BRANCH" != "master" ]; then
# #     exit 0
# # fi

# echo "HERE!!"
# # BRANCH="feature/major/something"
# if [[ "$HEAD_BRANCH" =~ feature\/major\/.+ ]]; then echo "MAJOR + 1";
# elif [[ "$HEAD_BRANCH" =~ feature\/minor\/.+ ]]; then echo "MINOR + 1";
# else echo "PATCH + 1"; fi
# # git push --tags

# # node -e "console.log(require('./package.json').version)";
# sd

if ! [[ $TRAVIS_TAG ]]; then
    PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
    export TRAVIS_TAG="v$PACKAGE_VERSION"
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
    git tag "$TRAVIS_TAG"
    git push --tags https://${GITHUB_TOKEN}@github.com/gabrielmdc/greenpi-backend.git
    # git config --local user.name "$USER_NAME" &&
    # git config --local user.email "$USER_EMAIL" &&
    # git tag "$TRAVIS_TAG" "$TRAVIS_COMMIT";
fi