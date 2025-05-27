#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Predeploy"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace predeploy"

endLogSection "$section_id"
