@echo off
cd /d %~dp0
pushd TestPages
call npm run print-versions -s
popd
