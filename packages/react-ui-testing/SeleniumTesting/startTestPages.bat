cd /d %~dp0

call npm install

pushd TestPages
call npm install
call npm run install-versions
start npm start --env.specialIdForProcessKill="8ae78075-b41d-4cb5-bda6-1de5c329f05f"
popd
