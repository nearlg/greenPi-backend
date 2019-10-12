#!/bin/bash

if [[ -z $DOCKER_HUB || -z $DOCKER_HUB_KEY ]]; then
    echo "ERROR: the environment variables 'DOCKER_HUB' and 'DOCKER_HUB_KEY' must be defined"
    exit 1;
fi
PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
VERSION=$(cut -d '.' -f1,2 <<< $PACKAGE_VERSION)
echo "Docker-Hub login..."
docker login -u $DOCKER_HUB -p $DOCKER_HUB_KEY &&
echo "Tagging..." &&
docker tag greenpi-backend:$VERSION gmdcwork/greenpi-backend:$VERSION
echo "Pushing image into Docker-Hub..." &&
docker push gmdcwork/greenpi-backend:$VERSION
