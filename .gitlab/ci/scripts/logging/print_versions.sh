#!/usr/bin/env bash
source ./.gitlab/ci/scripts/logging/logging.sh

REACT=${REACT_VERSION:-17}
TYPESCRIPT=${TYPESCRIPT_VERSION:-4}
STRICT=${STRICT_MODE:-'false'}

logVerbose "ENV PARAMS:"
echo "REACT_VERSION: $REACT"
echo "TYPESCRIPT_VERSION: $TYPESCRIPT"
echo "STRICT_MODE: $STRICT"