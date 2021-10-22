@echo off
echo Starting..
:main
node deploy-commands.js
node index.js
echo Restarting Bot..
goto main