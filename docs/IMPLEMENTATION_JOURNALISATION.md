# Implémentation de la Journalisation - DyFolio

## ✅ Ce qui a été implémenté

### 1. Configuration Winston (`src/config/logger.ts`)
- **Niveaux de log** : error, warn, info, debug
- **Sorties** :
  - Console avec couleurs
  - Fichier `logs/app.log` (tous les logs)
  - Fichier `logs/error.log` (erreurs uniquement)
- **Rotation automatique** : Max 5MB par fichier, 5 fichiers max

### 2. Intégration Morgan (`src/utils/morganStream.ts`)
- Stream personnalisé pour rediriger Morgan vers Winston
- Logs de toutes les requêtes HTTP (méthode, URL, statut, temps)

### 3. Mise à jour du serveur (`src/index.ts`)
- Import et utilisation du logger
- Middleware Morgan configuré
- Logs au démarrage et en cas d'erreur

### 4. Mise à jour du contrôleur Auth (`src/controllers/auth.ts`)
- Remplacement de `console.log` par `logger`
- Logs détaillés pour :
  - Inscriptions réussies
  - Tentatives avec email existant
  - Connexions réussies
  - Tentatives de connexion échouées
  - Erreurs serveur

## 📊 Types de logs générés

### INFO
- ✅ Apollo Server démarré
- ✅ Serveur en marche sur http://localhost:PORT
- ✅ Nouvel utilisateur inscrit
- ✅ Utilisateur connecté
- 📝 Toutes les requêtes HTTP (via Morgan)

### WARN
- ⚠️ Tentative d'inscription avec données manquantes
- ⚠️ Tentative d'inscription avec email existant
- ⚠️ Tentative de connexion avec email inexistant
- ⚠️ Tentative de connexion avec mot de passe invalide

### ERROR
- ❌ JWT secret non configuré
- ❌ Erreur lors de l'inscription
- ❌ Erreur lors de la connexion
- ❌ Erreur au démarrage du serveur

## 📁 Fichiers créés/modifiés

### Nouveaux fichiers
- `src/config/logger.ts` - Configuration Winston
- `src/utils/morganStream.ts` - Stream pour Morgan
- `docs/JOURNALISATION.md` - Documentation
- `logs/.gitkeep` - Dossier des logs
- `tests/logging.rest` - Tests REST

### Fichiers modifiés
- `src/index.ts` - Ajout logger et Morgan
- `src/controllers/auth.ts` - Remplacement console par logger

## 🚀 Utilisation

### Démarrer le serveur
```bash
npm run dev
```

### Tester la journalisation
Utiliser le fichier `tests/logging.rest` pour :
1. Inscription d'un utilisateur → génère un log INFO
2. Connexion avec mauvais mot de passe → génère un log WARN
3. Connexion réussie → génère un log INFO
4. Inscription email existant → génère un log WARN

### Consulter les logs

**Console** : Logs colorés en temps réel

**Fichiers** :
- `logs/app.log` : Tous les logs
- `logs/error.log` : Uniquement les erreurs

## 🔧 Configuration

Variable d'environnement `.env` :
```
LOG_LEVEL=info
```

Valeurs : `error`, `warn`, `info`, `debug`

## ✅ Avantages

1. **Centralisation** : Tous les logs au même endroit
2. **Traçabilité** : Fichiers persistants avec rotation
3. **Niveaux** : Filtrage facile (info, warn, error)
4. **HTTP** : Toutes les requêtes loggées automatiquement
5. **Production ready** : Configuration adaptée pour la prod
6. **Debugging** : Stack traces complètes pour les erreurs

## 🎯 Prochaines étapes possibles

- Ajouter des logs dans les resolvers GraphQL
- Implémenter des logs pour les opérations CRUD
- Ajouter un transport pour envoyer les erreurs critiques (email, Slack)
- Implémenter des métriques (temps de réponse, nombre de requêtes)
