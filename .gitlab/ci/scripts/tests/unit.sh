#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$1 Unit tests"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace test"

endLogSection "$section_id"
