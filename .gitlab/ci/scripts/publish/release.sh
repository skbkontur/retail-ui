#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Publish"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace release"

endLogSection "$section_id"
