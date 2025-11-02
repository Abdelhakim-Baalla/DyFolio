# API GraphQL DyFolio - Documentation des CRUDs

## 📋 Vue d'ensemble

Cette API GraphQL fournit des opérations CRUD complètes pour gérer un portfolio professionnel.

## 🔐 Authentification

Toutes les opérations (sauf `login` et `register`) nécessitent une authentification JWT.

**Header requis:**
```
Authorization: Bearer VOTRE_TOKEN_JWT
```

## 📚 Modules disponibles

### 1. 🔑 Authentification & Profil

#### Mutations disponibles:
- `register` - Créer un nouveau compte utilisateur
- `login` - Se connecter et obtenir un token JWT
- `updateProfil` - Mettre à jour le profil utilisateur

#### Queries disponibles:
- `getProfil` - Récupérer le profil de l'utilisateur connecté
- `getPortfolio` - Récupérer le portfolio complet (profil + projets + compétences + expériences)

📖 **Documentation:** Voir le code source pour plus de détails

---

### 2. 🚀 CRUD Projets

Gérer les projets du portfolio.

#### Queries:
- `getProjets` - Récupérer tous les projets
- `getProjet(id)` - Récupérer un projet spécifique

#### Mutations:
- `createProjet(input)` - Créer un nouveau projet
- `updateProjet(id, input)` - Mettre à jour un projet
- `deleteProjet(id)` - Supprimer un projet

📖 **Documentation complète:** [`docs/CRUD_PROJETS.md`](./CRUD_PROJETS.md)  
🧪 **Tests:** [`tests/projets.rest`](../tests/projets.rest)

**Exemple rapide:**
```graphql
# Créer un projet
mutation {
  createProjet(input: {
    titre: "Mon Projet"
    description: "Description du projet"
    lienDemo: "https://demo.com"
    lienCode: "https://github.com/user/repo"
  }) {
    id
    titre
  }
}
```

---

### 3. 💡 CRUD Compétences

Gérer les compétences techniques du portfolio.

#### Queries:
- `getCompetences` - Récupérer toutes les compétences
- `getCompetence(id)` - Récupérer une compétence spécifique

#### Mutations:
- `createCompetence(input)` - Créer une nouvelle compétence
- `updateCompetence(id, input)` - Mettre à jour une compétence
- `deleteCompetence(id)` - Supprimer une compétence

📖 **Documentation complète:** [`docs/CRUD_COMPETENCES.md`](./CRUD_COMPETENCES.md)  
🧪 **Tests:** [`tests/competences.rest`](../tests/competences.rest)

**Exemple rapide:**
```graphql
# Créer une compétence
mutation {
  createCompetence(input: {
    nom: "React"
    niveau: 85
    categorie: "64abc123def456789"
  }) {
    id
    nom
    niveau
  }
}
```

---

### 4. 💼 CRUD Expériences

Gérer les expériences professionnelles du portfolio.

#### Queries:
- `getExperiences` - Récupérer toutes les expériences
- `getExperience(id)` - Récupérer une expérience spécifique

#### Mutations:
- `createExperience(input)` - Créer une nouvelle expérience
- `updateExperience(id, input)` - Mettre à jour une expérience
- `deleteExperience(id)` - Supprimer une expérience

📖 **Documentation complète:** [`docs/CRUD_EXPERIENCES.md`](./CRUD_EXPERIENCES.md)  
🧪 **Tests:** [`tests/experiences.rest`](../tests/experiences.rest)

**Exemple rapide:**
```graphql
# Créer une expérience
mutation {
  createExperience(input: {
    poste: "Développeur Full Stack"
    entreprise: "Tech Company"
    description: "Développement d'applications web"
    dateDebut: "2023-01-15"
    dateFin: "2024-06-30"
  }) {
    id
    poste
    entreprise
  }
}
```

---

## 🎯 Guide de démarrage rapide

### Étape 1: Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Étape 2: Créer un compte

```graphql
mutation {
  register(input: {
    username: "johndoe"
    email: "john@example.com"
    password: "SecurePass123"
    nom: "Doe"
    prenom: "John"
    metier: "Développeur Full Stack"
  }) {
    token
    user {
      id
      username
      email
    }
  }
}
```

### Étape 3: Utiliser le token

Copiez le token retourné et ajoutez-le dans le header de vos prochaines requêtes:
```
Authorization: Bearer VOTRE_TOKEN_ICI
```

### Étape 4: Créer votre contenu

1. Créez des catégories (à implémenter)
2. Créez des compétences
3. Créez des projets
4. Mettez à jour votre profil

---

## 🗂️ Structure des données

```
Utilisateur
  ├── Profil (nom, prenom, metier, bio, photo, etc.)
  ├── Projets[]
  │   └── Competences[] (référence)
  ├── Competences[]
  │   └── Categorie (référence)
  └── Experiences[]
```

## 📊 Schéma GraphQL

Le schéma complet est disponible dans [`src/schema/index.ts`](../src/schema/index.ts)

### Types principaux:

- **Profil** - Informations personnelles de l'utilisateur
- **Projet** - Projet du portfolio avec titre, description, liens, images
- **Competence** - Compétence technique avec nom, niveau (0-100) et catégorie
- **Categorie** - Catégorie pour organiser les compétences
- **Experience** - Expérience professionnelle avec poste, entreprise, dates

---

## 🧪 Tests

Tous les tests sont disponibles dans le dossier `tests/` au format REST Client.

Pour utiliser les tests:
1. Installez l'extension "REST Client" dans VS Code
2. Ouvrez un fichier `.rest`
3. Remplacez les variables `@token` et IDs par vos valeurs
4. Cliquez sur "Send Request" au-dessus de chaque requête

**Fichiers de tests disponibles:**
- [`tests/graphql.rest`](../tests/graphql.rest) - Tests généraux
- [`tests/projets.rest`](../tests/projets.rest) - Tests CRUD Projets
- [`tests/competences.rest`](../tests/competences.rest) - Tests CRUD Compétences
- [`tests/experiences.rest`](../tests/experiences.rest) - Tests CRUD Expériences

---

## 🔧 Technologies utilisées

- **Node.js** + **TypeScript**
- **GraphQL** avec `graphql-tag`
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe

---

## 📁 Architecture du projet

```
src/
├── config/
│   └── db.ts              # Configuration MongoDB
├── controllers/
│   └── auth.ts            # Contrôleurs d'authentification
├── models/
│   ├── Utilisateur.ts     # Modèle Utilisateur
│   ├── Profil.ts          # Modèle Profil
│   ├── Projet.ts          # Modèle Projet
│   ├── Competence.ts      # Modèle Competence
│   ├── Categorie.ts       # Modèle Categorie
│   └── Experience.ts      # Modèle Experience
├── schema/
│   └── index.ts           # Schéma GraphQL (types, queries, mutations)
├── resolvers/
│   └── index.ts           # Resolvers GraphQL
├── middlewares/
│   └── jwt.ts             # Middleware JWT
└── index.ts               # Point d'entrée de l'application

docs/
├── CRUD_PROJETS.md        # Documentation CRUD Projets
├── CRUD_COMPETENCES.md    # Documentation CRUD Compétences
└── API_GRAPHQL.md         # Ce fichier

tests/
├── graphql.rest           # Tests généraux
├── projets.rest           # Tests CRUD Projets
└── competences.rest       # Tests CRUD Compétences
```

---

## 🚀 Prochaines fonctionnalités

- [ ] CRUD Catégories
- [x] ~~CRUD Projets~~ ✅ Complété
- [x] ~~CRUD Compétences~~ ✅ Complété
- [x] ~~CRUD Expériences~~ ✅ Complété
- [ ] Upload d'images
- [ ] Pagination des résultats
- [ ] Filtres et recherche
- [ ] Statistiques du portfolio
- [ ] Export du portfolio (PDF, JSON)
- [ ] Portfolio public par utilisateur

---

## 📝 Conventions et bonnes pratiques

### Nommage
- **Types GraphQL:** PascalCase (ex: `Projet`, `Competence`)
- **Champs:** camelCase (ex: `lienDemo`, `dateDebut`)
- **Queries:** préfixe `get` (ex: `getProjets`, `getCompetence`)
- **Mutations:** verbe d'action (ex: `createProjet`, `updateCompetence`)

### Niveaux de compétence
Échelle recommandée (0-100):
- **0-25:** Débutant
- **26-50:** Intermédiaire
- **51-75:** Avancé
- **76-100:** Expert

### Gestion des erreurs
Toutes les erreurs sont retournées au format GraphQL standard:
```json
{
  "errors": [
    {
      "message": "Message d'erreur descriptif"
    }
  ]
}
```

---

## 🆘 Support et contribution

Pour toute question ou suggestion:
1. Consultez la documentation spécifique de chaque module
2. Vérifiez les fichiers de tests pour des exemples
3. Créez une issue sur le dépôt Git

---

## 📄 Licence

[À définir]

---

**Dernière mise à jour:** 2 novembre 2025
