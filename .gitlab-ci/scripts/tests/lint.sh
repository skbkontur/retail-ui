#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$workspace Lint/tests"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace lint"
return_code_lint=$?

if [ $return_code_lint -ne 0 ]; then
    logError "Не прошли lint тесты (exitCode $return_code_lint)" "off"
	exit $return_code_lint
fi

endLogSection "$section_id"
