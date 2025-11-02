# 🐳 Docker Compose - DyFolio - Documentation Complète

## ✅ Task DYF-37 : COMPLÉTÉE

### 🎯 Objectif
Conteneuriser l'application DyFolio avec Docker Compose (API + MongoDB).

---

## 📦 Ce qui a été créé

### 1️⃣ Configuration Docker

#### `Dockerfile`
- Image Node.js 18 Alpine (légère)
- Build de production optimisé
- Multi-stage pour réduire la taille
- Expose le port 4000

#### `docker-compose.yml`
**Services :**
- 🔷 **MongoDB** : Base de données (port 27017)
- 🔶 **API** : Application Node.js (port 4000)

**Fonctionnalités :**
- ✅ Health checks automatiques
- ✅ Restart automatique
- ✅ Volumes persistants
- ✅ Réseau isolé
- ✅ Variables d'environnement

#### `.dockerignore`
Optimise le build en excluant :
- node_modules
- logs
- tests
- .env

### 2️⃣ Scripts de démarrage

#### `scripts/start-docker.sh` (Linux/Mac)
Script bash automatique pour :
- Vérifier Docker/Docker Compose
- Arrêter les services existants
- Construire et démarrer
- Afficher les logs

#### `scripts/start-docker.bat` (Windows)
Version Windows du script.

### 3️⃣ Documentation

- **DOCKER_README.md** : Documentation complète
- **QUICK_START_DOCKER.md** : Guide rapide
- **tests/docker.rest** : Tests REST pour Docker

### 4️⃣ Configuration

- **.env.docker** : Variables d'environnement pour Docker

---

## 🚀 Utilisation

### Démarrage simple

```bash
docker-compose up -d --build
```

### Avec les scripts

**Windows :**
```bash
scripts\start-docker.bat
```

**Linux/Mac :**
```bash
chmod +x scripts/start-docker.sh
./scripts/start-docker.sh
```

### Vérification

```bash
# État des services
docker-compose ps

# Logs
docker-compose logs -f

# Test API
curl http://localhost:4000/graphql
```

---

## 📊 Architecture Docker

```
┌─────────────────────────────────────┐
│         DyFolio Network             │
│                                     │
│  ┌─────────────┐   ┌─────────────┐ │
│  │  API:4000   │   │ MongoDB     │ │
│  │  (Node.js)  │◄──┤ :27017      │ │
│  └─────────────┘   └─────────────┘ │
│         │                           │
└─────────┼───────────────────────────┘
          │
          ▼
    localhost:4000
```

---

## 🔧 Configuration détaillée

### Variables d'environnement (API)

| Variable | Valeur | Description |
|----------|--------|-------------|
| NODE_ENV | production | Environnement |
| PORT | 4000 | Port de l'API |
| MONGODB_URI | mongodb://mongodb:27017/dyfolio | Connexion MongoDB |
| JWT_SECRET | (généré) | Secret JWT |
| LOG_LEVEL | info | Niveau de log |

### Ports exposés

| Service | Port interne | Port externe |
|---------|--------------|--------------|
| API | 4000 | 4000 |
| MongoDB | 27017 | 27017 |

### Volumes

| Volume | Montage | Utilisation |
|--------|---------|-------------|
| mongodb_data | /data/db | Données MongoDB |
| mongodb_config | /data/configdb | Config MongoDB |
| ./logs | /app/logs | Logs application |

---

## 🏥 Health Checks

### MongoDB
```yaml
test: echo 'db.runCommand("ping").ok' | mongosh
interval: 10s
timeout: 5s
retries: 5
```

### API
```yaml
test: wget --spider http://localhost:4000/graphql
interval: 30s
timeout: 10s
retries: 3
```

---

## 📋 Commandes Docker Compose

### Gestion des services

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Redémarrer
docker-compose restart

# Rebuild
docker-compose up -d --build

# Supprimer (avec volumes)
docker-compose down -v
```

### Logs et debugging

```bash
# Logs tous services
docker-compose logs -f

# Logs API uniquement
docker-compose logs -f api

# Logs MongoDB uniquement
docker-compose logs -f mongodb

# Dernières 100 lignes
docker-compose logs --tail=100
```

### Accès aux conteneurs

```bash
# Shell dans l'API
docker-compose exec api sh

# MongoDB shell
docker-compose exec mongodb mongosh

# Voir les processus
docker-compose top
```

### Monitoring

```bash
# Statistiques en temps réel
docker stats

# État des services
docker-compose ps

# Événements
docker-compose events
```

---

## 🧪 Tests

### 1. Test de santé de l'API
```bash
curl http://localhost:4000/graphql
```

### 2. Test MongoDB
```bash
docker-compose exec mongodb mongosh --eval "db.version()"
```

### 3. Tests REST
Utiliser le fichier `tests/docker.rest` :
- Inscription
- Connexion
- Requêtes GraphQL

---

## 🎯 Avantages de cette configuration

### ✅ Simplicité
- Une seule commande pour démarrer
- Configuration minimale
- Scripts automatiques

### ✅ Robustesse
- Health checks
- Restart automatique
- Volumes persistants

### ✅ Performance
- Images Alpine (légères)
- Build optimisé
- Réseau isolé

### ✅ Production Ready
- Variables d'environnement
- Logs persistants
- Configuration flexible

---

## 🔍 Résolution de problèmes

### Port 4000 déjà utilisé

**Solution 1 : Changer le port**
```yaml
# docker-compose.yml
ports:
  - "5000:4000"  # Utiliser 5000
```

**Solution 2 : Arrêter le processus**
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### MongoDB ne démarre pas

```bash
# Supprimer les volumes et recommencer
docker-compose down -v
docker-compose up -d
```

### L'API ne se connecte pas à MongoDB

```bash
# Vérifier les logs
docker-compose logs mongodb
docker-compose logs api

# Vérifier le réseau
docker network inspect dyfolio_dyfolio-network
```

### Rebuild complet nécessaire

```bash
# Tout supprimer et reconstruire
docker-compose down -v
docker system prune -a --volumes
docker-compose up -d --build
```

---

## 📈 Évolutions possibles

### 🔹 Ajouter un reverse proxy (Nginx)
```yaml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"
  depends_on:
    - api
```

### 🔹 Ajouter Redis pour le cache
```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
```

### 🔹 Monitoring avec Prometheus
```yaml
prometheus:
  image: prom/prometheus
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

---

## ✅ Checklist de déploiement

- [x] Dockerfile créé
- [x] docker-compose.yml configuré
- [x] .dockerignore optimisé
- [x] Health checks implémentés
- [x] Volumes persistants
- [x] Scripts de démarrage
- [x] Documentation complète
- [x] Tests REST

---

## 🎊 Résultat

✅ **Application conteneurisée**
✅ **Déploiement simplifié**
✅ **MongoDB intégré**
✅ **Production ready**
✅ **Scripts automatiques**

---

## 📚 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Docker Image](https://hub.docker.com/_/node)

---

**Task DYF-37 : Docker Compose - COMPLÉTÉE** ✅ 🎉
