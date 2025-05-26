#!/bin/bash
source ./.gitlab-ci/scripts/logging/logging.sh

workspace=$1
package_path=$2

section_id="$workspace UI Сreevey"
startLogCollapsedSection "$section_id"

CONTAINER_IP=$(ip a | grep "global eth0" | cut -c 10- | sed -r 's/[/].+//')

exe "GET_IP_URL=https://fake.testkontur.ru/ip GRID_URL=https://grid.skbkontur.ru/common/wd/hub CONTAINER_IP=$CONTAINER_IP yarn workspace $workspace creevey:ci"
return_code=$?

if [ $return_code -ne 0 ]; then
    logError "Не смогли запустить тесты Сreevey (exitCode $return_code)" "off"
	exit $return_code
fi

endLogSection "$section_id"
