# CI/CD avec GitHub Actions

Ce document explique la configuration CI/CD mise en place pour DyFolio.

## Workflow CI/CD

Le pipeline CI/CD est automatiquement déclenché sur :
- **Push** sur les branches : `main`, `develop`, `FEATURE/**`
- **Pull Request** vers : `main`, `develop`

## Jobs du Pipeline

### 1. Lint
Vérifie la qualité du code et la compilation TypeScript.

**Étapes :**
- Checkout du code
- Installation de Node.js 18
- Installation des dépendances (`npm ci`)
- Exécution d'ESLint (si configuré)
- Vérification de la compilation TypeScript (`npm run build`)

**Durée estimée :** 1-2 minutes

### 2. Test
Exécute les tests unitaires et d'intégration avec couverture de code.

**Services :**
- MongoDB 7.0 (service Docker)

**Étapes :**
- Checkout du code
- Installation de Node.js 18
- Installation des dépendances
- Exécution des tests avec couverture (`npm test`)
- Upload de la couverture vers Codecov
- Archivage des résultats de tests

**Durée estimée :** 2-3 minutes

### 3. Build
Compile le projet TypeScript et génère les artifacts.

**Dépendances :** Lint, Test

**Étapes :**
- Checkout du code
- Installation de Node.js 18
- Installation des dépendances
- Build TypeScript (`npm run build`)
- Archivage des artifacts (dossier `dist/`)

**Durée estimée :** 1-2 minutes

### 4. Docker
Construit et pousse l'image Docker vers Docker Hub.

**Conditions :**
- Uniquement sur push
- Uniquement sur les branches `main` ou `develop`

**Dépendances :** Lint, Test, Build

**Étapes :**
- Checkout du code
- Configuration de Docker Buildx
- Connexion à Docker Hub
- Extraction des métadonnées (tags, labels)
- Build et push de l'image Docker avec cache
- Affichage du digest de l'image

**Tags générés :**
- `latest` (uniquement sur `main`)
- `main` ou `develop` (selon la branche)
- `{branch}-{sha}` (hash du commit)

**Durée estimée :** 3-5 minutes

### 5. Security
Analyse de sécurité des dépendances.

**Dépendances :** Lint

**Étapes :**
- Checkout du code
- Installation de Node.js 18
- Installation des dépendances
- Exécution de `npm audit`
- Scan Snyk (si token configuré)

**Durée estimée :** 1-2 minutes

### 6. Notify
Notification de l'état du pipeline.

**Conditions :** Toujours exécuté

**Dépendances :** Lint, Test, Build, Docker

**Étapes :**
- Vérification du statut des jobs
- Affichage du résumé (branche, commit, auteur)

## Configuration requise

### Secrets GitHub

Pour que le pipeline fonctionne complètement, configurez ces secrets dans :
**Settings → Secrets and variables → Actions**

| Secret | Description | Obligatoire |
|--------|-------------|-------------|
| `DOCKER_USERNAME` | Username Docker Hub | Oui (pour Docker push) |
| `DOCKER_PASSWORD` | Token Docker Hub | Oui (pour Docker push) |
| `SNYK_TOKEN` | Token Snyk pour scan sécurité | Non (optionnel) |

### Créer un token Docker Hub

1. Se connecter sur https://hub.docker.com
2. Aller dans **Account Settings → Security**
3. Cliquer sur **New Access Token**
4. Nommer le token (ex: `github-actions`)
5. Copier le token généré
6. Ajouter dans GitHub Secrets :
   - `DOCKER_USERNAME` : votre username Docker Hub
   - `DOCKER_PASSWORD` : le token généré

### Créer un token Snyk (optionnel)

1. Se connecter sur https://snyk.io
2. Aller dans **Account Settings**
3. Copier votre **API Token**
4. Ajouter dans GitHub Secrets : `SNYK_TOKEN`

## Visualisation

### Badges de statut

Les badges suivants sont disponibles dans le README :

```markdown
[![CI/CD Pipeline](https://github.com/Abdelhakim-Baalla/DyFolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Abdelhakim-Baalla/DyFolio/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Abdelhakim-Baalla/DyFolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Abdelhakim-Baalla/DyFolio)
[![Docker Image](https://img.shields.io/docker/v/abdelhakimbaalla/dyfolio-api?label=docker&logo=docker)](https://hub.docker.com/r/abdelhakimbaalla/dyfolio-api)
```

### Consulter les workflows

1. Aller sur le dépôt GitHub
2. Cliquer sur l'onglet **Actions**
3. Voir tous les workflows exécutés
4. Cliquer sur un workflow pour voir les détails de chaque job

## Flux de travail

### Feature branch
```
1. Créer une branche FEATURE/xxx
2. Faire des commits
3. Push → CI/CD exécute Lint + Test + Build
4. Créer une PR vers develop
5. CI/CD s'exécute à nouveau
6. Merge après validation
```

### Develop branch
```
1. Merge de PR
2. CI/CD exécute : Lint + Test + Build + Docker
3. Image Docker poussée avec tag develop
```

### Main branch (Production)
```
1. Merge de develop vers main
2. CI/CD exécute : Lint + Test + Build + Docker
3. Image Docker poussée avec tags :
   - latest
   - main
   - main-{sha}
```

## Optimisations

### Cache

Le workflow utilise plusieurs niveaux de cache :
- **npm cache** : Dependencies Node.js (via `actions/setup-node@v4`)
- **Docker cache** : Layers Docker (via registry cache)

### Parallélisation

Les jobs s'exécutent en parallèle quand possible :
- `lint` et `security` en parallèle
- `test` en parallèle avec `lint`
- `build` et `docker` après réussite des précédents

### Durée totale estimée

- **Feature branch** : 3-4 minutes (sans Docker)
- **Main/Develop** : 6-8 minutes (avec Docker)

## Artifacts

Les artifacts générés sont disponibles pendant 7 jours :
- **test-results** : Couverture de code et logs
- **dist** : Build TypeScript compilé

### Télécharger les artifacts

1. Aller dans **Actions → Workflow exécuté**
2. Scroller vers le bas
3. Section **Artifacts**
4. Cliquer pour télécharger

## Monitoring

### Codecov

La couverture de code est automatiquement uploadée vers Codecov :
- https://codecov.io/gh/Abdelhakim-Baalla/DyFolio

### Docker Hub

Les images Docker sont disponibles sur :
- https://hub.docker.com/r/abdelhakimbaalla/dyfolio-api

## Troubleshooting

### Le job Docker échoue

**Erreur : denied: requested access to the resource is denied**

Solution :
1. Vérifier que `DOCKER_USERNAME` et `DOCKER_PASSWORD` sont configurés
2. Vérifier que le token Docker Hub est valide
3. Vérifier que le nom d'utilisateur est correct

### Les tests échouent

**Erreur : Cannot connect to MongoDB**

Solution :
- Le service MongoDB est automatiquement démarré dans le workflow
- Vérifier les logs du job `test`
- Le service attend d'être healthy avant de lancer les tests

### Le build TypeScript échoue

**Erreur : Cannot find module**

Solution :
- Vérifier que toutes les dépendances sont dans `package.json`
- Vérifier le fichier `tsconfig.json`
- Localement : `npm run build` pour reproduire

### npm audit trouve des vulnérabilités

Le workflow continue même avec des vulnérabilités modérées.

Actions :
1. Vérifier les vulnérabilités : `npm audit`
2. Corriger automatiquement : `npm audit fix`
3. Pour les vulnérabilités critiques : mettre à jour manuellement

## Améliorations futures

- [ ] Tests E2E avec Cypress ou Playwright
- [ ] Déploiement automatique sur environnement de staging
- [ ] Notifications Slack/Discord
- [ ] Performance tests avec k6
- [ ] Lighthouse CI pour les métriques de performance
- [ ] Automated releases avec semantic-release
- [ ] Multi-stage Docker builds optimisés
- [ ] Integration avec SonarQube pour analyse de code

## Commandes utiles

```bash
# Tester localement le build
npm run build

# Tester localement les tests
npm test

# Construire l'image Docker localement
docker build -t dyfolio-api:local .

# Vérifier les vulnérabilités
npm audit

# Voir les workflows GitHub
gh workflow list
gh workflow view ci.yml
gh run list
```

## Support

Pour toute question sur le CI/CD :
1. Consulter les logs du workflow dans l'onglet Actions
2. Vérifier cette documentation
3. Créer une issue sur GitHub
