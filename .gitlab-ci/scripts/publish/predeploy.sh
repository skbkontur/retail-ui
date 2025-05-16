#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$workspace Predeploy"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace predeploy"
return_code_lint=$?

if [ $return_code_lint -ne 0 ]; then
    logError "Упал predeploy (exitCode $return_code_lint)" "off"
	exit $return_code_lint
fi

endLogSection "$section_id"
