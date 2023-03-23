@ECHO OFF

SET TARGET_FOLDER=%~dp0\node_modules
IF NOT EXIST "%TARGET_FOLDER%" (
    ECHO "<<%TARGET_FOLDER%>>folder is not exist!!"
    CALL "%~dp0/react-install.bat"
)

SET BUILD_FOLDER=%~dp0\build
IF EXIST %BUILD_FOLDER% (
    RD /s /q "%BUILD_FOLDER%\"
    ECHO build folder deleted!!
)

ECHO react compile starting!!

CALL npm run build

ECHO react compile finished!!

pause