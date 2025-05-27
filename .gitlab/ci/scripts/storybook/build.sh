#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Build Storybook"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace storybook:build"

endLogSection "$section_id"
