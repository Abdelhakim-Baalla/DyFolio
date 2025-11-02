# 🐳 Push de l'image Docker sur Docker Hub

## 📋 Prérequis

1. Compte Docker Hub : https://hub.docker.com/
2. Docker Desktop démarré
3. Connexion à Docker Hub

## 🔐 Se connecter à Docker Hub

```bash
docker login
```

Entrez votre username et password Docker Hub.

## 🏗️ Construire l'image avec un tag

```bash
# Remplacer 'votre-username' par votre username Docker Hub
docker build -t votre-username/dyfolio-api:latest .
docker build -t votre-username/dyfolio-api:v1.0.0 .
```

## 📤 Pusher l'image

```bash
# Push de la dernière version
docker push votre-username/dyfolio-api:latest

# Push de la version spécifique
docker push votre-username/dyfolio-api:v1.0.0
```

## 🚀 Utiliser l'image depuis Docker Hub

### Modifier docker-compose.yml

Remplacer :
```yaml
api:
  build:
    context: .
    dockerfile: Dockerfile
```

Par :
```yaml
api:
  image: votre-username/dyfolio-api:latest
```

### Pull et run

```bash
docker pull votre-username/dyfolio-api:latest
docker-compose up -d
```

## 📝 Script complet (après avoir démarré Docker Desktop)

```bash
# 1. Se connecter
docker login

# 2. Construire l'image
docker build -t abdelhakimbaalla/dyfolio-api:latest .
docker build -t abdelhakimbaalla/dyfolio-api:v1.0.0 .

# 3. Pusher sur Docker Hub
docker push abdelhakimbaalla/dyfolio-api:latest
docker push abdelhakimbaalla/dyfolio-api:v1.0.0

# 4. Tester le pull
docker pull abdelhakimbaalla/dyfolio-api:latest
```

## 🔄 Mise à jour de l'image

```bash
# Après des modifications du code :
docker build -t abdelhakimbaalla/dyfolio-api:latest .
docker push abdelhakimbaalla/dyfolio-api:latest
```

## 📊 Vérifier sur Docker Hub

Visitez : https://hub.docker.com/r/votre-username/dyfolio-api

## ⚙️ Configuration automatique avec GitHub Actions (optionnel)

Créer `.github/workflows/docker-publish.yml` :

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            abdelhakimbaalla/dyfolio-api:latest
            abdelhakimbaalla/dyfolio-api:${{ github.ref_name }}
```

## ✅ Checklist

- [ ] Démarrer Docker Desktop
- [ ] Se connecter avec `docker login`
- [ ] Construire l'image avec votre username
- [ ] Pusher sur Docker Hub
- [ ] Vérifier sur hub.docker.com
- [ ] Tester le pull de l'image
