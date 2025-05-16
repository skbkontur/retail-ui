#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$1 Build"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace build"
return_code_tests=$?

if [ $return_code_tests -ne 0 ]; then
    logError "Не прошел build (exitCode $return_code_tests)" "off"
	exit $return_code_tests
fi

endLogSection "$section_id"
