#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$workspace Publish"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace release"
return_code_lint=$?

if [ $return_code_lint -ne 0 ]; then
    logError "Упал publish (exitCode $return_code_lint)" "off"
	exit $return_code_lint
fi

endLogSection "$section_id"
