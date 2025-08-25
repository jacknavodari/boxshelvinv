@echo off
echo ========================================
echo BoxShelvInv - Windows Installer Builder
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Building Windows installer...
call npm run build-win

if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to build installer
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
echo.
echo The installer has been created in the 'dist' folder.
echo Look for a file named 'BoxShelvInv Setup *.exe'
echo.
pause