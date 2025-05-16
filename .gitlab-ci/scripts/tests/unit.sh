#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$1 Unit tests"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace test"
return_code_tests=$?

if [ $return_code_tests -ne 0 ]; then
    logError "Не прошли unit тесты (exitCode $return_code_tests)" "off"
	exit $return_code_tests
fi

endLogSection "$section_id"
