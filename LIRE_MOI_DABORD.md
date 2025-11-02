# ⚠️ INSTRUCTIONS IMPORTANTES

## 🚦 ÉTAPE 1 : Démarrer Docker Desktop

**VOUS DEVEZ D'ABORD DÉMARRER DOCKER DESKTOP !**

### Windows :
1. Appuyez sur la touche Windows
2. Cherchez "Docker Desktop"
3. Cliquez pour ouvrir
4. Attendez que l'icône devienne verte dans la barre des tâches

### Vérification :
```bash
docker --version
docker info
```

Si vous voyez des informations, Docker est prêt ! ✅

---

## 🚀 ÉTAPE 2 : Tester localement

Une fois Docker Desktop démarré :

```bash
docker-compose up -d --build
```

Attendez quelques minutes pour le build et le téléchargement des images.

### Vérifier que ça fonctionne :
```bash
docker-compose ps
docker-compose logs -f
```

### Tester l'API :
Ouvrir dans le navigateur : http://localhost:4000/graphql

---

## 📤 ÉTAPE 3 : Pusher sur Docker Hub

### 3.1 Créer un compte
Aller sur : https://hub.docker.com/signup

### 3.2 Modifier votre username

**Dans `scripts/push-docker.bat`, ligne 4 :**
```bat
SET DOCKER_USERNAME=votre-username-dockerhub
```

### 3.3 Exécuter le script
```bash
scripts\push-docker.bat
```

Le script va :
- Vous demander de vous connecter
- Construire l'image
- La pusher sur Docker Hub

### 3.4 Vérifier
Aller sur : https://hub.docker.com/r/votre-username/dyfolio-api

---

## 📝 Résumé des commandes

```bash
# 1. Vérifier Docker
docker --version

# 2. Démarrer local
docker-compose up -d --build

# 3. Voir les logs
docker-compose logs -f

# 4. Arrêter
docker-compose down

# 5. Pusher (après modification du username)
scripts\push-docker.bat
```

---

## ❌ Erreurs courantes

### "unable to get image" ou "pipe/dockerDesktopLinuxEngine"
➡️ **Docker Desktop n'est pas démarré**
➡️ Démarrer Docker Desktop et attendre 1-2 minutes

### "denied: requested access"
➡️ **Pas connecté à Docker Hub**
➡️ Faire : `docker login`

### Port 4000 déjà utilisé
➡️ Fermer l'application qui utilise le port
➡️ Ou changer le port dans docker-compose.yml

---

## ✅ TODO

- [ ] Démarrer Docker Desktop (OBLIGATOIRE)
- [ ] Attendre que Docker soit prêt
- [ ] Exécuter `docker-compose up -d --build`
- [ ] Vérifier que ça fonctionne sur http://localhost:4000/graphql
- [ ] Créer compte Docker Hub
- [ ] Modifier username dans scripts/push-docker.bat
- [ ] Exécuter scripts\push-docker.bat
- [ ] Vérifier sur hub.docker.com

---

**COMMENCEZ PAR DÉMARRER DOCKER DESKTOP !** 🐳
