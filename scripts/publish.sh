#!/bin/bash

if $TRAVIS; then
    exit 1;
fi

set -e

cd ../

yarn lerna --scope $0 publish --yes --skip-npm
