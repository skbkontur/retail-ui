#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

section_id="yarn install"

startLogCollapsedSection "$section_id"

exe "yarn install" "$section_1"

endLogSection "$section_id"