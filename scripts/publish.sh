#!/bin/bash

echo "Start publishing..."

if [ ! $@ ]; then
    echo "Package name is reqiured!"
    exit 1
fi

set -e
set -x

yarn lerna --scope $@ publish --skip-npm --conventional-commits --changelog-preset angular
