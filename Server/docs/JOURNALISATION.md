# Journalisation DyFolio

## Configuration

La journalisation utilise **Winston** pour enregistrer les événements et **Morgan** pour les requêtes HTTP.

## Niveaux de logs

- **error** : Erreurs critiques
- **warn** : Avertissements (tentatives échouées, etc.)
- **info** : Informations générales (démarrage, connexions réussies)
- **debug** : Détails de débogage

## Fichiers de logs

Les logs sont enregistrés dans le dossier `logs/` :

- `app.log` : Tous les logs
- `error.log` : Uniquement les erreurs

## Configuration

Variable d'environnement dans `.env` :
```
LOG_LEVEL=info
```

Valeurs possibles : `error`, `warn`, `info`, `debug`

## Exemples de logs

### Authentification
- [OK] Inscription réussie
- [ERREUR] Email déjà existant
- [OK] Connexion réussie
- [ERREUR] Mot de passe invalide

### Requêtes HTTP
Toutes les requêtes HTTP sont loggées avec Morgan (méthode, URL, statut, temps de réponse)

## Utilisation dans le code

```typescript
import logger from './config/logger';

// Info
logger.info('Utilisateur connecté');

// Warning
logger.warn('Tentative de connexion échouée');

// Error
logger.error('Erreur critique', error);
```
