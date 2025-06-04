#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

workspace=$1
section_id="$workspace UI Сreevey"

startLogCollapsedSection "$section_id"

CONTAINER_IP=$(ip a | grep "global eth0" | cut -c 10- | sed -r 's/[/].+//')

exe "CONTAINER_IP=$CONTAINER_IP yarn workspace $workspace creevey:ci"

endLogSection "$section_id"
