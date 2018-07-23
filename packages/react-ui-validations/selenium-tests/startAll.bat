cd /d %~dp0

pushd ..
start "storybook" yarn run storybook
popd

pushd .\Assemblies\WebDriver
start "Selenium" cycle.bat
popd
