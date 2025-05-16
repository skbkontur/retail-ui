#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1

section_id="$workspace Build Storybook"
startLogCollapsedSection "$section_id"

exe "yarn workspace $workspace storybook:build"
return_code=$?

if [ $return_code -ne 0 ]; then
    logError "Не смогли собрать Storybook (exitCode $return_code)" "off"
	exit $return_code
fi

endLogSection "$section_id"
