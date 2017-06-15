#!/bin/bash -e
cd "$(dirname "$0")"

cd ../../build
npm publish
cd ../docs
yarn
./deploy.sh
cd ..