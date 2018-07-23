pushd %~dp0
pskill -accepteula >nul 2>nul
pskill chromedriver.exe
:start
chromedriver.exe
popd
goto start