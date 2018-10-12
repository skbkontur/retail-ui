SET OutputDir=%~dp0Output
SET Configuration=Release
SET NpmExe=npm

pushd %~dp0

rmdir %OutputDir% /s /q
mkdir %OutputDir%

call %NpmExe% install --only-dev
call %NpmExe% run build

dotnet restore
dotnet build -c %Configuration%

popd

