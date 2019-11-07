#!/bin/bash

HEAD_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
if [[ "$HEAD_BRANCH" == "master" ]]; then
    echo "Use a pull request to update the version number in package.json"
    exit 1;
fi

YARN_CONF=$(yarn config get version-git-tag)
yarn config set version-git-tag false
if [[ "$HEAD_BRANCH" =~ feature(s)?\/major\/.+ ]]; then yarn version --major;
elif [[ "$HEAD_BRANCH" =~ features(s)?\/minor\/.+ ]]; then yarn version --minor;
else yarn version --patch; fi
yarn config set version-git-tag $YARN_CONF

if [[ $1 == 'release' ]]; then
    PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
    git add package.json
    git commit -m "v$PACKAGE_VERSION"
    git checkout master
    git merge $HEAD_BRANCH
    git tag -a "v$PACKAGE_VERSION" -m "version $PACKAGE_VERSION"
    git push --follow-tags
fi