#!/bin/bash

# Script de build robuste pour DyFolio Frontend
# Ce script nettoie l'environnement avant de builder

echo "🧹 Nettoyage des artifacts de build précédents..."
rm -rf dist
rm -rf node_modules/.vite

echo "✅ Vérification de l'intégrité des fichiers..."
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: index.html introuvable"
    exit 1
fi

if [ -d "index.html" ]; then
    echo "❌ Erreur: index.html est un répertoire!"
    exit 1
fi

if [ ! -f "vite.config.js" ]; then
    echo "❌ Erreur: vite.config.js introuvable"
    exit 1
fi

echo "📦 Lancement du build Vite..."
NODE_ENV=production npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    echo "📊 Contenu du répertoire dist:"
    ls -lah dist/
else
    echo "❌ Le build a échoué"
    exit 1
fi
