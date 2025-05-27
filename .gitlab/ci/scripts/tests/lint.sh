#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Lint/tests"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace lint"

endLogSection "$section_id"
