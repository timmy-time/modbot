@echo off
echo Starting..
:main
npm install
node index.js
echo Restarting Bot..
goto main