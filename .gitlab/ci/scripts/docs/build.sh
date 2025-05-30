#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace Build Docs"

startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace storybook:docs-build"

endLogSection "$section_id"
