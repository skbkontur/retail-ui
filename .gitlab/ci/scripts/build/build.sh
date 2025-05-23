#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$1 Build"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace build"

endLogSection "$section_id"
