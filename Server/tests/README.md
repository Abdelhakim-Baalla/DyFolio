# Tests DyFolio

## Installation des dépendances

```bash
npm install
```

## Lancer les tests

### Tous les tests

```bash
npm test
```

### Tests en mode watch (redémarrage automatique)

```bash
npm run test:watch
```

## Structure des tests

### Tests Unitaires (`tests/unit/`)

- **competence.validator.test.ts** : Tests de validation des compétences
- **experience.validator.test.ts** : Tests de validation des expériences
- **projet.validator.test.ts** : Tests de validation des projets

### Tests d'Intégration (`tests/integration/`)

- **auth.test.ts** : Tests complets d'inscription et de connexion

## Couverture de code

La couverture de code est générée automatiquement dans le dossier `coverage/`.
Pour voir le rapport HTML, ouvrez `coverage/index.html` dans un navigateur.

## Technologies utilisées**est** : Framework de tests

- **Supertest** : Tests HTTP
- **MongoDB Memory Server** : Base de données en mémoire pour les tests
