# 🚀 Guide de Démarrage Rapide - Docker

## ✅ Prérequis

- Docker Desktop installé
- Docker Compose installé

## 🎯 Démarrage en 3 étapes

### 1️⃣ Démarrer les services

**Windows :**
```powershell
docker-compose up -d --build
```

**Linux/Mac :**
```bash
docker-compose up -d --build
```

### 2️⃣ Vérifier que tout fonctionne

```bash
# Voir l'état des services
docker-compose ps

# Voir les logs
docker-compose logs -f
```

### 3️⃣ Tester l'API

Ouvrir le navigateur : http://localhost:4000/graphql

## 🛑 Arrêter les services

```bash
docker-compose down
```

## 📊 Services disponibles

| Service | URL | Description |
|---------|-----|-------------|
| API | http://localhost:4000 | API REST |
| GraphQL | http://localhost:4000/graphql | Interface GraphQL |
| MongoDB | localhost:27017 | Base de données |

## 🔧 Commandes utiles

```bash
# Redémarrer
docker-compose restart

# Voir les logs en temps réel
docker-compose logs -f api

# Reconstruire après modifications
docker-compose up -d --build

# Tout supprimer (y compris les données)
docker-compose down -v
```

## 💡 Scripts automatiques

**Windows :**
```powershell
.\scripts\start-docker.bat
```

**Linux/Mac :**
```bash
chmod +x scripts/start-docker.sh
./scripts/start-docker.sh
```

## ✨ C'est tout !

Votre application DyFolio tourne maintenant avec Docker ! 🎉

Pour plus de détails, consultez `DOCKER_README.md`
