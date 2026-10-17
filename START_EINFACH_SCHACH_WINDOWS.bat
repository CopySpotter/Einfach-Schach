@echo off
setlocal
cd /d "%~dp0app"

if not exist "src\data\users.json" copy "src\data\users.example.json" "src\data\users.json" >nul

if not exist "node_modules" (
  echo Installiere die benoetigten Bausteine. Das ist nur beim ersten Start noetig...
  call npm.cmd ci --legacy-peer-deps
  if errorlevel 1 pause & exit /b 1
)

echo Starte Einfach-Schach...
call npm.cmd run dev
pause
