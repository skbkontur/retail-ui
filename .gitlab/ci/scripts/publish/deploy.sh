#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Deploy"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace deploy"

endLogSection "$section_id"
