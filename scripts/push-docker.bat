@echo off
REM Script de build et push de l'image Docker DyFolio (Windows)

REM Configuration
SET DOCKER_USERNAME=abdelhakimbaalla
SET IMAGE_NAME=dyfolio-api
SET VERSION=1.0.0

echo Build et Push de l'image Docker DyFolio
echo ==========================================

REM Vérifier que Docker est démarré
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Docker n'est pas demarre. Veuillez demarrer Docker Desktop.
    exit /b 1
)

echo [OK] Docker est demarre

REM Construire l'image
echo.
echo Construction de l'image...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:latest .
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:v%VERSION% .

if %errorlevel% neq 0 (
    echo [ERREUR] Echec de la construction de l'image
    exit /b 1
)

echo [OK] Image construite avec succes

REM Se connecter à Docker Hub si nécessaire
echo.
echo Verification de la connexion Docker Hub...
echo Si vous n'etes pas connecte, entrez vos identifiants Docker Hub:
docker login

if %errorlevel% neq 0 (
    echo [ERREUR] Echec de la connexion a Docker Hub
    exit /b 1
)

REM Pusher l'image
echo.
echo Push de l'image sur Docker Hub...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:latest
docker push %DOCKER_USERNAME%/%IMAGE_NAME%:v%VERSION%

if %errorlevel% neq 0 (
    echo [ERREUR] Echec du push de l'image
    exit /b 1
)

echo.
echo [OK] Image pushee avec succes !
echo.
echo Lien Docker Hub: https://hub.docker.com/r/%DOCKER_USERNAME%/%IMAGE_NAME%
echo.
echo Pour utiliser l'image:
echo    docker pull %DOCKER_USERNAME%/%IMAGE_NAME%:latest
echo    docker run -p 4000:4000 %DOCKER_USERNAME%/%IMAGE_NAME%:latest
echo.
pause
