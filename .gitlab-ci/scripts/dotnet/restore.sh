#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

solution=$1

section_id="dotnet restore $solution"
startLogCollapsedSection "$section_id"

exe "dotnet restore $solution"
return_code=$?

if [ $return_code -ne 0 ]; then
    logError "Не смог выполнить dotnet restore (exitCode $return_code)" "off"
	exit $return_code
fi

endLogSection "$section_id"
