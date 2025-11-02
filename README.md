# DyFolio

API Portfolio dynamique avec GraphQL et REST - Gérez vos compétences, expériences et projets professionnels.

## Description

DyFolio est une API backend complète permettant de créer et gérer un portfolio professionnel. L'application offre une double interface (REST et GraphQL) pour gérer les utilisateurs, compétences, expériences professionnelles et projets.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture MVC](#architecture-mvc)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Exemples de requêtes](#exemples-de-requêtes)
- [Tests](#tests)
- [Docker](#docker)
- [Documentation API](#documentation-api)
- [Collection Postman](#collection-postman)

## Fonctionnalités

- [OK] Authentification JWT (inscription/connexion)
- [OK] CRUD Compétences (avec niveaux et catégories)
- [OK] CRUD Expériences professionnelles
- [OK] CRUD Projets
- [OK] API REST et GraphQL
- [OK] Validation des données (Joi)
- [OK] Journalisation (Winston + Morgan)
- [OK] Tests unitaires et d'intégration (Jest)
- [OK] Containerisation Docker
- [OK] Base de données MongoDB

## Technologies utilisées

### Backend
- **Node.js** v18+ - Environnement d'exécution JavaScript
- **TypeScript** - Typage statique
- **Express.js** - Framework web
- **Apollo Server** - Serveur GraphQL

### Base de données
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB

### Sécurité & Validation
- **JWT** - Authentification par tokens
- **Bcrypt** - Hashage des mots de passe
- **Joi** - Validation des schémas de données

### Logs & Tests
- **Winston** - Système de journalisation
- **Morgan** - Logger HTTP
- **Jest** - Framework de tests
- **Supertest** - Tests d'API

### DevOps
- **Docker** & **Docker Compose** - Containerisation
- **ts-node-dev** - Rechargement automatique en développement

## Architecture MVC

L'application suit le pattern **MVC (Model-View-Controller)** adapté pour une API :

```
src/
├── models/              # Modèles (Schémas Mongoose)
│   ├── Utilisateur.ts   # Modèle utilisateur avec authentification
│   ├── Competence.ts    # Modèle compétence
│   ├── Experience.ts    # Modèle expérience professionnelle
│   ├── Projet.ts        # Modèle projet
│   ├── Categorie.ts     # Modèle catégorie de compétences
│   └── Profil.ts        # Modèle profil utilisateur
│
├── controllers/         # Contrôleurs (Logique métier REST)
│   └── auth.ts          # Contrôleur authentification
│
├── resolvers/           # Resolvers GraphQL (Contrôleurs GraphQL)
│   └── index.ts         # Resolvers pour queries et mutations
│
├── routes/              # Routes REST
│   └── auth.ts          # Routes d'authentification
│
├── schema/              # Schémas GraphQL
│   └── index.ts         # Type definitions GraphQL
│
├── validators/          # Validation Joi
│   ├── competence.validator.ts
│   ├── experience.validator.ts
│   └── projet.validator.ts
│
├── middlewares/         # Middlewares
│   └── jwt.ts           # Middleware authentification JWT
│
├── config/              # Configuration
│   ├── db.ts            # Connexion MongoDB
│   └── logger.ts        # Configuration Winston
│
└── index.ts             # Point d'entrée de l'application
```

### Flux de données

1. **Requête** → Routes (REST) ou Schema (GraphQL)
2. **Validation** → Joi Validators
3. **Authentification** → Middleware JWT
4. **Logique métier** → Controllers/Resolvers
5. **Accès données** → Models (Mongoose)
6. **Réponse** → JSON (REST) ou GraphQL Response

## Prérequis

- **Node.js** : v18 ou supérieur
- **MongoDB** : v7.0 ou supérieur (local ou Docker)
- **npm** : v9 ou supérieur

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Abdelhakim-Baalla/DyFolio.git
cd DyFolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Serveur
PORT=4000

# Base de données
MONGODB_URI=mongodb://localhost:27017/dyfolio

# JWT
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi

# Logs
LOG_LEVEL=info
```

## Configuration

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `PORT` | Port du serveur | `4000` |
| `MONGODB_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/dyfolio` |
| `JWT_SECRET` | Secret pour signer les tokens JWT | **À définir obligatoirement** |
| `LOG_LEVEL` | Niveau de logs (error, warn, info, debug) | `info` |

## Démarrage

### Mode développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:4000`
- Interface GraphQL : `http://localhost:4000/graphql`
- API REST : `http://localhost:4000/api`

### Mode production

```bash
# Compiler TypeScript
npm run build

# Démarrer le serveur
npm start
```

### Avec Docker

```bash
# Démarrer tous les services (API + MongoDB)
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## Exemples de requêtes

### REST API

#### 1. Inscription

```http
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "motDePasse": "MotDePasse123!"
}
```

#### 2. Connexion

```http
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "jean.dupont@example.com",
  "motDePasse": "MotDePasse123!"
}
```

**Réponse :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "utilisateur": {
    "id": "507f1f77bcf86cd799439011",
    "email": "jean.dupont@example.com",
    "nom": "Dupont",
    "prenom": "Jean"
  }
}
```

### GraphQL API

#### 1. Créer une compétence

```graphql
mutation {
  creerCompetence(input: {
    nom: "TypeScript"
    niveau: 4
    categorie: "507f1f77bcf86cd799439011"
    description: "Langage typé pour JavaScript"
  }) {
    id
    nom
    niveau
    description
  }
}
```

#### 2. Récupérer toutes les compétences

```graphql
query {
  competences {
    id
    nom
    niveau
    categorie {
      id
      nom
    }
    description
  }
}
```

#### 3. Créer une expérience

```graphql
mutation {
  creerExperience(input: {
    poste: "Développeur Full Stack"
    entreprise: "TechCorp"
    description: "Développement d'applications web modernes"
    dateDebut: "2023-01-01"
    dateFin: "2024-12-31"
    lieu: "Paris, France"
    type: "CDI"
  }) {
    id
    poste
    entreprise
    dateDebut
    dateFin
  }
}
```

#### 4. Créer un projet

```graphql
mutation {
  creerProjet(input: {
    titre: "Application E-commerce"
    description: "Plateforme de vente en ligne complète"
    technologies: ["React", "Node.js", "MongoDB"]
    lienGithub: "https://github.com/user/project"
    lienDemo: "https://demo.example.com"
  }) {
    id
    titre
    description
    technologies
    lienGithub
    lienDemo
  }
}
```

#### 5. Récupérer le portfolio complet

```graphql
query {
  profil(utilisateurId: "507f1f77bcf86cd799439011") {
    utilisateur {
      nom
      prenom
      email
    }
    competences {
      nom
      niveau
    }
    experiences {
      poste
      entreprise
      dateDebut
      dateFin
    }
    projets {
      titre
      technologies
    }
  }
}
```

## Tests

### Exécuter les tests

```bash
# Tous les tests avec couverture
npm test

# Tests en mode watch
npm run test:watch
```

### Couverture des tests

L'application dispose d'une couverture de tests de **85.96%** :

- **Tests unitaires** : Validation Joi (compétences, expériences, projets)
- **Tests d'intégration** : API d'authentification (inscription, connexion)

```bash
# Rapport de couverture
npm test

# Le rapport détaillé se trouve dans coverage/lcov-report/index.html
```

## Docker

### Build et démarrage rapide

```bash
# Avec le script automatique (Windows)
.\scripts\start-docker.bat

# Avec le script automatique (Linux/Mac)
chmod +x scripts/start-docker.sh
./scripts/start-docker.sh

# Ou manuellement
docker-compose up -d --build
```

### Services disponibles

| Service | URL | Description |
|---------|-----|-------------|
| API | `http://localhost:4000` | API REST |
| GraphQL | `http://localhost:4000/graphql` | Interface GraphQL |
| MongoDB | `mongodb://localhost:27017` | Base de données |

### Commandes Docker utiles

```bash
# Voir les logs
docker-compose logs -f api

# Accéder au conteneur
docker-compose exec api sh

# Redémarrer les services
docker-compose restart

# Arrêter et supprimer tout
docker-compose down -v
```

## Documentation API

### Documentation complète

- **Validation Joi** : `docs/VALIDATION_JOI.md`
- **CRUD Compétences** : `docs/CRUD_COMPETENCES.md`
- **CRUD Expériences** : `docs/CRUD_EXPERIENCES.md`
- **CRUD Projets** : `docs/CRUD_PROJETS.md`
- **Journalisation** : `docs/JOURNALISATION.md`
- **Docker** : `DOCKER_README.md`
- **Tests** : `tests/RAPPORT_TESTS.md`

### GraphQL Playground

Une fois le serveur démarré, accédez à `http://localhost:4000/graphql` pour :
- Explorer le schéma GraphQL complet
- Tester les queries et mutations
- Voir la documentation auto-générée

## Collection Postman

Une collection Postman complète est disponible dans le fichier `postman_collection.json`.

### Import de la collection

1. Ouvrir Postman
2. Cliquer sur **Import**
3. Sélectionner `postman_collection.json`
4. La collection "DyFolio API" apparaît dans votre sidebar

### Contenu de la collection

#### Authentification
- `POST` Register - Inscription d'un nouvel utilisateur
- `POST` Login - Connexion et récupération du token JWT

#### Compétences
- `POST` Créer compétence
- `GET` Liste des compétences
- `GET` Compétence par ID
- `PUT` Modifier compétence
- `DELETE` Supprimer compétence

#### Expériences
- `POST` Créer expérience
- `GET` Liste des expériences
- `GET` Expérience par ID
- `PUT` Modifier expérience
- `DELETE` Supprimer expérience

#### Projets
- `POST` Créer projet
- `GET` Liste des projets
- `GET` Projet par ID
- `PUT` Modifier projet
- `DELETE` Supprimer projet

#### Portfolio
- `GET` Portfolio complet - Récupère toutes les données (GraphQL)

### Configuration

La collection utilise des variables d'environnement :
- `{{baseUrl}}` : `http://localhost:4000`
- `{{token}}` : Token JWT (configuré automatiquement après login)

## Diagrammes

### Diagramme Use Case

![DyFolio Use Case](src/assets/Conception/DyFolio-UseCase.jpg)

### Diagramme des classes

![DyFolio class diagramme](src/assets/Conception/DyFolio-Diagramme-des-classes.jpg)

Fichier source des diagrammes : `src/assets/Conception/DyFolio.mdj`

## Structure du projet

```
DyFolio/
├── src/                        # Code source TypeScript
│   ├── config/                 # Configuration (DB, Logger)
│   ├── controllers/            # Contrôleurs REST
│   ├── middlewares/            # Middlewares (JWT, etc.)
│   ├── models/                 # Modèles Mongoose
│   ├── resolvers/              # Resolvers GraphQL
│   ├── routes/                 # Routes REST
│   ├── schema/                 # Schémas GraphQL
│   ├── validators/             # Validateurs Joi
│   └── index.ts                # Point d'entrée
│
├── tests/                      # Tests Jest
│   ├── unit/                   # Tests unitaires
│   └── integration/            # Tests d'intégration
│
├── docs/                       # Documentation
│   ├── CRUD_*.md               # Documentation CRUD
│   ├── VALIDATION_JOI.md       # Documentation validation
│   └── JOURNALISATION.md       # Documentation logs
│
├── scripts/                    # Scripts utilitaires
│   ├── start-docker.sh         # Démarrage Docker (Linux/Mac)
│   └── start-docker.bat        # Démarrage Docker (Windows)
│
├── logs/                       # Fichiers de logs
│   ├── app.log                 # Tous les logs
│   └── error.log               # Logs d'erreurs uniquement
│
├── Dockerfile                  # Image Docker de l'API
├── docker-compose.yml          # Orchestration des services
├── postman_collection.json     # Collection Postman
├── jest.config.js              # Configuration Jest
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances et scripts
```

## Scripts npm disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur en mode développement avec rechargement automatique |
| `npm run build` | Compile TypeScript vers JavaScript (dossier `dist/`) |
| `npm start` | Démarre le serveur en mode production |
| `npm test` | Exécute tous les tests avec rapport de couverture |
| `npm run test:watch` | Exécute les tests en mode watch |

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

ISC

## Auteur

**Abdelhakim Baalla**

## Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation dans le dossier `docs/`
- Tester avec la collection Postman fournie

---

**Note** : N'oubliez pas de changer le `JWT_SECRET` dans le fichier `.env` avant de déployer en production !
