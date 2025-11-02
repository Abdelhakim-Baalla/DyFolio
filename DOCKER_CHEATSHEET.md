# 🐳 Docker - Référence Rapide

## ⚡ Commandes essentielles

### Démarrage
```bash
docker-compose up -d --build    # Construire et démarrer
docker-compose up -d            # Démarrer (sans rebuild)
```

### Arrêt
```bash
docker-compose down             # Arrêter
docker-compose down -v          # Arrêter + supprimer volumes
```

### Logs
```bash
docker-compose logs -f          # Tous les logs
docker-compose logs -f api      # Logs API uniquement
docker-compose logs -f mongodb  # Logs MongoDB uniquement
docker-compose logs --tail=50   # 50 dernières lignes
```

### État
```bash
docker-compose ps               # État des services
docker stats                    # Utilisation ressources
docker-compose top              # Processus en cours
```

### Maintenance
```bash
docker-compose restart          # Redémarrer
docker-compose restart api      # Redémarrer API uniquement
docker-compose stop             # Arrêter (sans supprimer)
docker-compose start            # Redémarrer après stop
```

### Accès aux conteneurs
```bash
docker-compose exec api sh              # Shell dans l'API
docker-compose exec mongodb mongosh     # MongoDB shell
```

### Nettoyage
```bash
docker system prune             # Nettoyer images inutilisées
docker system prune -a          # Nettoyer tout
docker volume prune             # Nettoyer volumes inutilisés
```

## 🔗 URLs

- **API** : http://localhost:4000
- **GraphQL** : http://localhost:4000/graphql
- **MongoDB** : localhost:27017

## 📁 Fichiers importants

- `docker-compose.yml` - Configuration
- `Dockerfile` - Image API
- `.dockerignore` - Optimisation
- `DOCKER_README.md` - Doc complète

## 🚨 Problèmes courants

### Port déjà utilisé
```bash
# Arrêter le processus sur le port 4000
docker-compose down
```

### Rebuild nécessaire
```bash
docker-compose up -d --build
```

### Tout réinitialiser
```bash
docker-compose down -v
docker-compose up -d --build
```

## ✅ Vérification rapide

```bash
# 1. Démarrer
docker-compose up -d

# 2. Vérifier l'état
docker-compose ps

# 3. Tester l'API
curl http://localhost:4000/graphql
```

## 📊 Services

| Service | Image | Port |
|---------|-------|------|
| API | Node 18 Alpine | 4000 |
| MongoDB | Mongo 7.0 | 27017 |

---

Pour plus de détails, voir `DOCKER_README.md`
