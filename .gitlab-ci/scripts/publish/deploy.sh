#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$workspace Deploy"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace deploy"
return_code_lint=$?

if [ $return_code_lint -ne 0 ]; then
    logError "Упал deploy (exitCode $return_code_lint)" "off"
	exit $return_code_lint
fi

endLogSection "$section_id"
