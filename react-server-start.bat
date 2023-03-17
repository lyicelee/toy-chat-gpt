@ECHO OFF

SET TARGET_FOLDER=%~dp0\node_modules

IF NOT EXIST "%TARGET_FOLDER%" (
    ECHO "<<%TARGET_FOLDER%>>folder is not exist!!"
    CALL "%~dp0/react-install.bat"
)

ECHO react server starting!!

CALL npm start

ECHO react started!!

pause