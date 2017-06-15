#!/bin/bash -e

cd ./build
npm publish
cd ../docs
yarn
./deploy.sh
cd ..