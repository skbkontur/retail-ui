#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

section_id="Install ip utilities"

startLogCollapsedSection "$section_id"

exe "apt-get update"
exe "apt-get install -yq iproute2"

endLogSection "$section_id"
