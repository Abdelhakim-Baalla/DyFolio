# 🐳 Docker Compose - DyFolio

## 📦 Ce qui est inclus

- **API DyFolio** : Application Node.js/Express/GraphQL
- **MongoDB** : Base de données locale
- **Volumes persistants** : Données conservées entre les redémarrages
- **Health checks** : Vérification automatique de l'état des services

## 🚀 Démarrage rapide

### 1. Construire et démarrer
```bash
docker-compose up -d --build
```

### 2. Voir les logs
```bash
docker-compose logs -f
```

### 3. Arrêter
```bash
docker-compose down
```

## 📋 Commandes utiles

### Démarrer les services
```bash
docker-compose up -d
```

### Arrêter les services
```bash
docker-compose down
```

### Redémarrer les services
```bash
docker-compose restart
```

### Voir les logs
```bash
# Tous les services
docker-compose logs -f

# API uniquement
docker-compose logs -f api

# MongoDB uniquement
docker-compose logs -f mongodb
```

### Vérifier l'état
```bash
docker-compose ps
```

### Reconstruire après changements
```bash
docker-compose up -d --build
```

### Supprimer tout (y compris les volumes)
```bash
docker-compose down -v
```

## 🔗 Accès aux services

| Service | URL | Port |
|---------|-----|------|
| API | http://localhost:4000 | 4000 |
| GraphQL | http://localhost:4000/graphql | 4000 |
| MongoDB | mongodb://localhost:27017 | 27017 |

## 🗂️ Structure

```
dyfolio/
├── docker-compose.yml    ← Configuration des services
├── Dockerfile            ← Image de l'API
├── .dockerignore         ← Fichiers à ignorer
└── .env.docker          ← Variables d'environnement (exemple)
```

## ⚙️ Configuration

Les variables d'environnement sont définies dans `docker-compose.yml` :

- `PORT=4000`
- `MONGODB_URI=mongodb://mongodb:27017/dyfolio`
- `JWT_SECRET=...`
- `LOG_LEVEL=info`

## 💾 Volumes persistants

Les données MongoDB sont stockées dans un volume Docker persistant :
- `mongodb_data` : Données de la base
- `mongodb_config` : Configuration MongoDB
- `./logs` : Logs de l'application (monté depuis l'hôte)

## 🔍 Health Checks

Les services incluent des health checks automatiques :
- **MongoDB** : Vérifie la connexion toutes les 10s
- **API** : Vérifie l'endpoint GraphQL toutes les 30s

## 🧪 Tester l'installation

```bash
# Vérifier que l'API répond
curl http://localhost:4000/graphql

# Vérifier MongoDB
docker-compose exec mongodb mongosh --eval "db.version()"
```

## 🛠️ Développement vs Production

### Mode développement (local)
```bash
npm run dev
```

### Mode production (Docker)
```bash
docker-compose up -d
```

## 📊 Monitoring

```bash
# Utilisation des ressources
docker stats

# Logs en temps réel
docker-compose logs -f

# Inspecter un conteneur
docker-compose exec api sh
docker-compose exec mongodb mongosh
```

## ⚠️ Résolution de problèmes

### Le port 4000 est déjà utilisé
```bash
# Changer le port dans docker-compose.yml
ports:
  - "5000:4000"  # Utiliser 5000 au lieu de 4000
```

### MongoDB ne démarre pas
```bash
# Supprimer les volumes et recommencer
docker-compose down -v
docker-compose up -d
```

### Reconstruire complètement
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 🎯 Prêt pour la production

Cette configuration est optimisée pour la production :
- ✅ Images Alpine (légères)
- ✅ Health checks
- ✅ Restart automatique
- ✅ Volumes persistants
- ✅ Réseau isolé
- ✅ Variables d'environnement sécurisées

## 📝 Notes

- Les logs sont montés depuis `./logs` pour faciliter l'accès
- MongoDB utilise la version 7.0 (dernière stable)
- L'API attend que MongoDB soit prêt avant de démarrer
