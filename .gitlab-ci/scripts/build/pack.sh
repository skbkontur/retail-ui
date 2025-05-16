#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1
filename=$2

section_id="Pack $1"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace pack --cwd ./build --filename $filename"
return_code_tests=$?

if [ $return_code_tests -ne 0 ]; then
    logError "Не прошел pack (exitCode $return_code_tests)" "off"
	exit $return_code_tests
fi

endLogSection "$section_id"
