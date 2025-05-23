#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

solution=$1
section_id="dotnet restore $solution"

startLogCollapsedSection "$section_id"

exe "dotnet restore $solution"

endLogSection "$section_id"
