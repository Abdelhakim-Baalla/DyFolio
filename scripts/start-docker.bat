@echo off
REM Script de démarrage Docker Compose pour DyFolio (Windows)

echo 🐳 Demarrage de DyFolio avec Docker Compose...

REM Vérifier si Docker est installé
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installe. Veuillez l'installer d'abord.
    exit /b 1
)

REM Vérifier si Docker Compose est installé
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose n'est pas installe. Veuillez l'installer d'abord.
    exit /b 1
)

REM Arrêter les services existants
echo 🛑 Arret des services existants...
docker-compose down

REM Construire et démarrer les services
echo 🔨 Construction et demarrage des services...
docker-compose up -d --build

REM Attendre que les services soient prêts
echo ⏳ Attente du demarrage des services...
timeout /t 5 /nobreak >nul

REM Vérifier l'état des services
echo 📊 Etat des services :
docker-compose ps

REM Afficher les logs
echo.
echo 📝 Logs des services (Ctrl+C pour quitter) :
docker-compose logs -f
