@ECHO OFF

SET TARGET_FOLDER=%~dp0\node_modules
IF EXIST "%TARGET_FOLDER%" (
    ECHO file deleting.....
    npm install rimraf -g
    rimraf node_modules
    REM RD /s /q "%TARGET_FOLDER%\"
    ECHO build folder deleted!!
)