#!/bin/bash

echo "Running build..."
PACKAGE_VERSION=$(node -e "console.log(require('./package.json').version)")
VERSION=$(cut -d '.' -f1,2 <<< $PACKAGE_VERSION)
docker build . -t greenpi-backend:$VERSION
