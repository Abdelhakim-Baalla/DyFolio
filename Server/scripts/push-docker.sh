#!/bin/bash

# Script de build et push de l'image Docker DyFolio

# Configuration
DOCKER_USERNAME="abdelhakimbaalla"
IMAGE_NAME="dyfolio-api"
VERSION="1.0.0"

echo "Build et Push de l'image Docker DyFolio"
echo "=========================================="

# Vérifier que Docker est démarré
if ! docker info > /dev/null 2>&1; then
    echo "[ERREUR] Docker n'est pas démarré. Veuillez démarrer Docker Desktop."
    exit 1
fi

echo "[OK] Docker est démarré"

# Vérifier la connexion Docker Hub
echo ""
echo "Vérification de la connexion Docker Hub..."
if ! docker info | grep -q "Username"; then
    echo "[INFO] Non connecté à Docker Hub. Connexion..."
    docker login
    if [ $? -ne 0 ]; then
        echo "[ERREUR] Échec de la connexion à Docker Hub"
        exit 1
    fi
fi

echo "[OK] Connecté à Docker Hub"

# Construire l'image
echo ""
echo "Construction de l'image..."
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:latest .
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:v${VERSION} .

if [ $? -ne 0 ]; then
    echo "[ERREUR] Échec de la construction de l'image"
    exit 1
fi

echo "[OK] Image construite avec succès"

# Pusher l'image
echo ""
echo "Push de l'image sur Docker Hub..."
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:v${VERSION}

if [ $? -ne 0 ]; then
    echo "[ERREUR] Échec du push de l'image"
    exit 1
fi

echo ""
echo "[OK] Image pushée avec succès !"
echo ""
echo "Lien Docker Hub: https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}"
echo ""
echo "Pour utiliser l'image:"
echo "   docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo "   docker run -p 4000:4000 ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
