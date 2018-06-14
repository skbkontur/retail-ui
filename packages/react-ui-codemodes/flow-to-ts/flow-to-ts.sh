#!/usr/bin/env bash

echo "================================================================"
echo "=                      RENAME                                  ="
echo "================================================================"
node scripts/rename.js "$@"


echo "================================================================"
echo "=                      APPLY CODE SHIFT                        ="
echo "================================================================"
yarn jscodeshift -t transform-stage-1.js --extensions tsx --parser flow "$@"
yarn jscodeshift -t transform-stage-2.js --extensions tsx --parser babylon "$@"

echo "================================================================"
echo "=                      DONE                                    ="
echo "================================================================"
