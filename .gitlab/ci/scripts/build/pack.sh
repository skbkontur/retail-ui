#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
filename=$2
section_id="Pack $1"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace pack --cwd ./build --filename $filename" "$section_id"

endLogSection "$section_id"
