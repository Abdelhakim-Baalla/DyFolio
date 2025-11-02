# CRUD Expériences - Documentation

## Vue d'ensemble

Ce module implémente un CRUD complet (Create, Read, Update, Delete) pour gérer les expériences professionnelles via GraphQL.

## Types GraphQL

### Type Experience

```graphql
type Experience {
  id: ID!
  poste: String!
  entreprise: String!
  description: String
  dateDebut: String
  dateFin: String
}
```

### Input Types

#### CreateExperienceInput

```graphql
input CreateExperienceInput {
  poste: String!
  entreprise: String!
  description: String
  dateDebut: String!
  dateFin: String
}
```

#### UpdateExperienceInput

```graphql
input UpdateExperienceInput {
  poste: String
  entreprise: String
  description: String
  dateDebut: String
  dateFin: String
}
```

## Queries

### 1. Récupérer toutes les expériences de l'utilisateur connecté

```graphql
query GetExperiences {
  getExperiences {
    id
    poste
    entreprise
    description
    dateDebut
    dateFin
  }
}
```

### 2. Récupérer une expérience spécifique par ID

```graphql
query GetExperience($id: ID!) {
  getExperience(id: $id) {
    id
    poste
    entreprise
    description
    dateDebut
    dateFin
  }
}
```

**Variables:**
```json
{
  "id": "64abc123def456789"
}
```

## Mutations

### 1. Créer une nouvelle expérience

```graphql
mutation CreateExperience($input: CreateExperienceInput!) {
  createExperience(input: $input) {
    id
    poste
    entreprise
    description
    dateDebut
    dateFin
  }
}
```

**Variables (expérience terminée):**
```json
{
  "input": {
    "poste": "Développeur Full Stack",
    "entreprise": "Tech Company",
    "description": "Développement d'applications web",
    "dateDebut": "2023-01-15",
    "dateFin": "2024-06-30"
  }
}
```

**Variables (expérience en cours):**
```json
{
  "input": {
    "poste": "Lead Developer",
    "entreprise": "StartupXYZ",
    "description": "Direction technique",
    "dateDebut": "2024-07-01"
  }
}
```

**Notes:**
- `poste`, `entreprise`, et `dateDebut` sont **obligatoires**
- `dateFin` est **optionnel** (omettez pour une expérience en cours)
- `description` est **optionnel**
- Les dates doivent être au format ISO 8601 (ex: "2024-01-15")

### 2. Mettre à jour une expérience

```graphql
mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
    poste
    entreprise
    description
    dateDebut
    dateFin
  }
}
```

**Variables (mise à jour complète):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "poste": "Senior Full Stack Developer",
    "entreprise": "Tech Company Inc.",
    "description": "Lead développeur sur des projets d'envergure"
  }
}
```

**Variables (terminer une expérience en cours):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "dateFin": "2024-11-02"
  }
}
```

**Variables (changer uniquement le poste):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "poste": "Tech Lead"
  }
}
```

### 3. Supprimer une expérience

```graphql
mutation DeleteExperience($id: ID!) {
  deleteExperience(id: $id)
}
```

**Variables:**
```json
{
  "id": "64abc123def456789"
}
```

## Authentification

⚠️ **Important:** Toutes les opérations nécessitent une authentification via JWT.

Incluez le token dans les headers de vos requêtes:
```
Authorization: Bearer VOTRE_TOKEN_JWT
```

## Sécurité

- **Authentification obligatoire:** Toutes les opérations vérifient que l'utilisateur est authentifié
- **Isolation des données:** Chaque utilisateur ne peut accéder qu'à ses propres expériences
- **Validation des permissions:** Les opérations de modification/suppression vérifient que l'expérience appartient bien à l'utilisateur

## Exemples d'utilisation

### Exemple complet: Créer, Lire, Mettre à jour, Supprimer

#### 1. Créer une expérience

```javascript
const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      id
      poste
      entreprise
      dateDebut
      dateFin
    }
  }
`;

const { data } = await client.mutate({
  mutation: CREATE_EXPERIENCE,
  variables: {
    input: {
      poste: "Développeur Backend",
      entreprise: "TechCorp",
      description: "Développement d'API REST avec Node.js",
      dateDebut: "2022-09-01",
      dateFin: "2023-12-31"
    }
  }
});
```

#### 2. Lire toutes les expériences

```javascript
const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      poste
      entreprise
      description
      dateDebut
      dateFin
    }
  }
`;

const { data } = await client.query({
  query: GET_EXPERIENCES
});

// Trier par date de début (plus récent en premier)
const sorted = data.getExperiences.sort((a, b) => 
  new Date(b.dateDebut) - new Date(a.dateDebut)
);
```

#### 3. Lire une expérience spécifique

```javascript
const GET_EXPERIENCE = gql`
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
      id
      poste
      entreprise
      description
      dateDebut
      dateFin
    }
  }
`;

const { data } = await client.query({
  query: GET_EXPERIENCE,
  variables: {
    id: experienceId
  }
});
```

#### 4. Mettre à jour une expérience

```javascript
const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      poste
      entreprise
      dateFin
    }
  }
`;

// Terminer une expérience en cours
const { data } = await client.mutate({
  mutation: UPDATE_EXPERIENCE,
  variables: {
    id: experienceId,
    input: {
      dateFin: new Date().toISOString().split('T')[0]
    }
  }
});
```

#### 5. Supprimer une expérience

```javascript
const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;

const { data } = await client.mutate({
  mutation: DELETE_EXPERIENCE,
  variables: {
    id: experienceId
  }
});
```

## Gestion des erreurs

Les erreurs courantes retournées:

- `"Utilisateur non authentifié"` - L'utilisateur n'est pas connecté ou le token est invalide
- `"Expérience non trouvée"` - L'expérience demandée n'existe pas
- `"Expérience non trouvée ou vous n'avez pas les permissions"` - L'expérience existe mais n'appartient pas à l'utilisateur
- `"Erreur lors de la création de l'expérience"` - Erreur lors de la création
- `"Erreur lors de la mise à jour de l'expérience"` - Erreur lors de la mise à jour
- `"Erreur lors de la suppression de l'expérience"` - Erreur lors de la suppression

## Bonnes pratiques

### Format des dates
Utilisez le format ISO 8601 pour les dates:
- **Format complet:** `2024-01-15T10:30:00Z`
- **Format date seule:** `2024-01-15` (recommandé pour les expériences)

### Expériences en cours
Pour une expérience actuellement en cours, **omettez** le champ `dateFin`:
```json
{
  "poste": "Lead Developer",
  "entreprise": "StartupXYZ",
  "dateDebut": "2024-07-01"
  // Pas de dateFin
}
```

### Description
Rédigez des descriptions claires et concises:
- ✅ Utilisez des verbes d'action
- ✅ Mentionnez les technologies utilisées
- ✅ Indiquez les réalisations principales
- ❌ Évitez les descriptions trop longues

**Exemple de bonne description:**
```
"Développement d'une plateforme e-commerce avec React et Node.js. 
Migration vers une architecture microservices, amélioration des performances de 40%."
```

### Ordre chronologique
Lors de l'affichage, triez les expériences par date de début décroissante (plus récentes en premier):

```javascript
const experiences = data.getExperiences.sort((a, b) => {
  const dateA = new Date(a.dateDebut);
  const dateB = new Date(b.dateDebut);
  return dateB - dateA; // Plus récent en premier
});
```

## Cas d'usage avancés

### Calculer la durée d'une expérience

```javascript
function calculateDuration(experience) {
  const start = new Date(experience.dateDebut);
  const end = experience.dateFin ? new Date(experience.dateFin) : new Date();
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 
                 + (end.getMonth() - start.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0) {
    return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
  }
  return `${remainingMonths} mois`;
}
```

### Filtrer les expériences en cours

```javascript
const currentExperiences = experiences.filter(exp => !exp.dateFin);
```

### Filtrer par entreprise

```javascript
const techCorpExperiences = experiences.filter(
  exp => exp.entreprise.toLowerCase().includes('techcorp')
);
```

### Grouper par année

```javascript
const byYear = experiences.reduce((acc, exp) => {
  const year = new Date(exp.dateDebut).getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(exp);
  return acc;
}, {});
```

## Tests

Utilisez le fichier `tests/experiences.rest` pour tester toutes les opérations CRUD avec l'extension REST Client de VS Code.

N'oubliez pas de:
1. Remplacer `YOUR_TOKEN_HERE` par votre token JWT
2. Remplacer `EXPERIENCE_ID_HERE` par un ID d'expérience valide
3. Utiliser des dates au format ISO (YYYY-MM-DD)

## Intégration avec le Portfolio

Les expériences sont automatiquement incluses dans la query `getPortfolio`:

```graphql
query {
  getPortfolio {
    profil {
      nom
      prenom
      metier
    }
    experiences {
      id
      poste
      entreprise
      description
      dateDebut
      dateFin
    }
    projets {
      titre
    }
    competences {
      nom
    }
  }
}
```

## Modèle de données

### Experience (Mongoose)
- `poste` (String, requis) - Intitulé du poste
- `entreprise` (String, requis) - Nom de l'entreprise
- `description` (String, optionnel) - Description des responsabilités et réalisations
- `dateDebut` (Date, requis) - Date de début de l'expérience
- `dateFin` (Date, optionnel) - Date de fin (null si expérience en cours)
- `utilisateur` (ObjectId, requis) - Référence vers l'utilisateur propriétaire

## Statistiques possibles

- Nombre total d'expériences
- Durée totale d'expérience professionnelle
- Nombre d'expériences en cours
- Entreprises où l'utilisateur a travaillé
- Postes occupés

---

**Documentation créée le:** 2 novembre 2025
