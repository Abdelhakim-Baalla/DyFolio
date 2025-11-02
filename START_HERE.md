# 🚀 Guide Rapide - Démarrage et Push Docker

## ⚠️ AVANT DE COMMENCER

**Démarrer Docker Desktop** :
- Windows : Ouvrir Docker Desktop depuis le menu Démarrer
- Mac : Ouvrir Docker Desktop depuis Applications
- Linux : `sudo systemctl start docker`

Attendre que Docker soit complètement démarré (icône verte).

---

## 📋 Option 1 : Build local et test

### 1. Démarrer Docker Desktop

### 2. Tester localement

```bash
# Build et démarrer
docker-compose up -d --build

# Voir les logs
docker-compose logs -f

# Tester l'API
curl http://localhost:4000/graphql
```

### 3. Arrêter

```bash
docker-compose down
```

---

## 📤 Option 2 : Push sur Docker Hub

### 1. Créer un compte Docker Hub

Aller sur https://hub.docker.com/ et créer un compte.

### 2. Modifier le username dans les scripts

**Fichier `scripts/push-docker.bat` (Windows) :**
```bat
SET DOCKER_USERNAME=votre-username
```

**Fichier `scripts/push-docker.sh` (Linux/Mac) :**
```bash
DOCKER_USERNAME="votre-username"
```

**Fichier `docker-compose.hub.yml` :**
```yaml
image: votre-username/dyfolio-api:latest
```

### 3. Exécuter le script de push

**Windows :**
```bash
scripts\push-docker.bat
```

**Linux/Mac :**
```bash
chmod +x scripts/push-docker.sh
./scripts/push-docker.sh
```

Le script va :
- ✅ Vérifier Docker
- ✅ Vous connecter à Docker Hub
- ✅ Construire l'image
- ✅ Pusher sur Docker Hub

### 4. Utiliser l'image depuis Docker Hub

```bash
# Utiliser docker-compose.hub.yml
docker-compose -f docker-compose.hub.yml up -d

# Ou directement
docker pull votre-username/dyfolio-api:latest
docker run -p 4000:4000 votre-username/dyfolio-api:latest
```

---

## 🔧 Commandes manuelles (alternative)

### Build et push manuel

```bash
# 1. Connexion
docker login

# 2. Build
docker build -t votre-username/dyfolio-api:latest .

# 3. Push
docker push votre-username/dyfolio-api:latest

# 4. Test pull
docker pull votre-username/dyfolio-api:latest
```

---

## 🐛 Résolution de problèmes

### "Docker n'est pas démarré"
➡️ Démarrer Docker Desktop et attendre l'icône verte

### "unable to get image"
➡️ Docker Desktop n'est pas complètement démarré, attendre encore

### "denied: requested access to the resource is denied"
➡️ Faire `docker login` avec vos identifiants Docker Hub

### Port 4000 déjà utilisé
```bash
# Arrêter les conteneurs
docker-compose down

# Ou changer le port dans docker-compose.yml
ports:
  - "5000:4000"
```

---

## ✅ Vérification que tout fonctionne

### 1. Docker est démarré
```bash
docker --version
docker info
```

### 2. Les conteneurs tournent
```bash
docker-compose ps
```

### 3. L'API répond
```bash
curl http://localhost:4000/graphql
```

Ou ouvrir dans le navigateur : http://localhost:4000/graphql

---

## 📝 Résumé des fichiers

| Fichier | Usage |
|---------|-------|
| `docker-compose.yml` | Build local |
| `docker-compose.hub.yml` | Utilise l'image Docker Hub |
| `scripts/push-docker.bat` | Push Windows |
| `scripts/push-docker.sh` | Push Linux/Mac |
| `Dockerfile` | Définition de l'image |

---

## 🎯 Prochaines étapes

1. ✅ Démarrer Docker Desktop
2. ✅ Tester localement avec `docker-compose up -d`
3. ✅ Créer un compte Docker Hub
4. ✅ Modifier le username dans les scripts
5. ✅ Pusher avec `scripts/push-docker.bat`
6. ✅ Vérifier sur hub.docker.com

---

**Besoin d'aide ?** Consultez `DOCKER_PUSH_GUIDE.md` pour plus de détails.
