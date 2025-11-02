# 📝 Guide Rapide - Journalisation

## 🎯 En bref

Tous les logs sont automatiquement enregistrés dans la **console** et dans des **fichiers** (`logs/`).

## 🚀 Démarrage

```bash
npm run dev
```

Les logs apparaissent immédiatement dans la console avec des couleurs ! 🎨

## 📂 Où trouver les logs ?

| Fichier | Contenu |
|---------|---------|
| `logs/app.log` | Tous les logs |
| `logs/error.log` | Uniquement les erreurs |
| Console | Temps réel avec couleurs |

## 📝 Ajouter des logs dans votre code

```typescript
import logger from './config/logger';

// Information
logger.info('Utilisateur créé');

// Avertissement
logger.warn('Tentative échouée');

// Erreur
logger.error('Erreur critique', error);
```

## ✅ Ce qui est déjà loggé

- ✅ Démarrage du serveur
- ✅ Toutes les requêtes HTTP (méthode, URL, statut)
- ✅ Inscriptions réussies
- ✅ Connexions réussies
- ⚠️ Tentatives d'inscription échouées
- ⚠️ Tentatives de connexion échouées
- ❌ Toutes les erreurs serveur

## 🧪 Tester

Utiliser le fichier `tests/logging.rest` pour voir les logs en action !

## ⚙️ Configuration

Dans le fichier `.env` :
```
LOG_LEVEL=info
```

Niveaux : `error` | `warn` | `info` | `debug`

---

**C'est tout !** La journalisation fonctionne automatiquement. 🎉
