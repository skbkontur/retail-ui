#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

section_id="yarn install"
startLogCollapsedSection "$section_id"

exe "yarn install"
return_code_yarn_ci=$?

endLogSection "$section_id"

if [ $return_code_yarn_ci -ne 0 ]; then
    logError "Не смогли выполнить команду yarn install (exitCode $return_code_yarn_ci)"
	exit $return_code_yarn_ci
fi
