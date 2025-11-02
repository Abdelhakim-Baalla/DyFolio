#!/bin/bash

# Script de démarrage Docker Compose pour DyFolio

echo "🐳 Démarrage de DyFolio avec Docker Compose..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Arrêter les services existants
echo "🛑 Arrêt des services existants..."
docker-compose down

# Construire et démarrer les services
echo "🔨 Construction et démarrage des services..."
docker-compose up -d --build

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 5

# Vérifier l'état des services
echo "📊 État des services :"
docker-compose ps

# Afficher les logs
echo ""
echo "📝 Logs des services (Ctrl+C pour quitter) :"
docker-compose logs -f
