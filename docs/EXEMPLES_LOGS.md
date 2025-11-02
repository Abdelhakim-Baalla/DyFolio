# Exemples de Logs - DyFolio

## Démarrage du serveur

```
2025-11-02 18:45:28 [INFO]: Apollo Server démarré avec succès
2025-11-02 18:45:28 [INFO]: Serveur en marche sur http://localhost:3895
2025-11-02 18:45:28 [INFO]: GraphQL disponible sur http://localhost:3895/graphql
```

## Requêtes HTTP (Morgan)

```
2025-11-02 18:46:15 [INFO]: ::1 - - [02/Nov/2025:17:46:15 +0000] "POST /api/v1/register HTTP/1.1" 201 156
2025-11-02 18:46:20 [INFO]: ::1 - - [02/Nov/2025:17:46:20 +0000] "POST /api/v1/login HTTP/1.1" 200 145
2025-11-02 18:46:25 [INFO]: ::1 - - [02/Nov/2025:17:46:25 +0000] "POST /graphql HTTP/1.1" 200 89
```

## Authentification réussie

### Inscription
```
2025-11-02 18:46:15 [INFO]: Nouvel utilisateur inscrit: john_doe (john@example.com)
```

### Connexion
```
2025-11-02 18:46:20 [INFO]: Utilisateur connecté: john_doe (john@example.com)
```

## Avertissements (WARN)

### Email déjà existant
```
2025-11-02 18:47:10 [WARN]: Tentative d'inscription avec un email déjà existant: john@example.com
```

### Mot de passe invalide
```
2025-11-02 18:47:15 [WARN]: Tentative de connexion avec un mot de passe invalide pour: john@example.com
```

### Email inexistant
```
2025-11-02 18:47:20 [WARN]: Tentative de connexion avec un email inexistant: unknown@example.com
```

### Données manquantes
```
2025-11-02 18:47:25 [WARN]: Tentative d'inscription avec des données manquantes
```

## Erreurs (ERROR)

### Erreur d'inscription
```
2025-11-02 18:48:00 [ERROR]: Erreur lors de l'inscription
Error: Cannot read property 'email' of undefined
    at register (src/controllers/auth.ts:15:30)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
    at next (node_modules/express/lib/router/route.js:144:13)
```

### JWT secret manquant
```
2025-11-02 18:48:30 [ERROR]: JWT secret not set
```

## Console colorée

En développement, les logs sont affichés avec des couleurs :
- 🟢 **INFO** : Vert
- 🟡 **WARN** : Jaune
- 🔴 **ERROR** : Rouge
- 🔵 **DEBUG** : Bleu

## Fichiers de logs

### logs/app.log (tous les logs)
```
2025-11-02 18:45:28 [INFO]: Apollo Server démarré avec succès
2025-11-02 18:45:28 [INFO]: Serveur en marche sur http://localhost:3895
2025-11-02 18:46:15 [INFO]: Nouvel utilisateur inscrit: john_doe (john@example.com)
2025-11-02 18:47:10 [WARN]: Tentative d'inscription avec un email déjà existant: john@example.com
2025-11-02 18:48:00 [ERROR]: Erreur lors de l'inscription
```

### logs/error.log (erreurs uniquement)
```
2025-11-02 18:48:00 [ERROR]: Erreur lors de l'inscription
Error: Cannot read property 'email' of undefined
    at register (src/controllers/auth.ts:15:30)
    ...
```
