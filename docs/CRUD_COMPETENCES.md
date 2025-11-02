# CRUD Compétences - Documentation

## Vue d'ensemble

Ce module implémente un CRUD complet (Create, Read, Update, Delete) pour gérer les compétences via GraphQL.

## Types GraphQL

### Type Competence
```graphql
type Competence {
  id: ID!
  nom: String!
  niveau: Int!
  categorie: Categorie
}
```

### Type Categorie
```graphql
type Categorie {
  id: ID!
  nom: String!
  description: String
}
```

### Input Types

#### CreateCompetenceInput
```graphql
input CreateCompetenceInput {
  nom: String!
  niveau: Int!
  categorie: ID!
}
```

#### UpdateCompetenceInput
```graphql
input UpdateCompetenceInput {
  nom: String
  niveau: Int
  categorie: ID
}
```

## Queries

### 1. Récupérer toutes les compétences de l'utilisateur connecté
```graphql
query GetCompetences {
  getCompetences {
    id
    nom
    niveau
    categorie {
      id
      nom
      description
    }
  }
}
```

### 2. Récupérer une compétence spécifique par ID
```graphql
query GetCompetence($id: ID!) {
  getCompetence(id: $id) {
    id
    nom
    niveau
    categorie {
      id
      nom
      description
    }
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

### 1. Créer une nouvelle compétence
```graphql
mutation CreateCompetence($input: CreateCompetenceInput!) {
  createCompetence(input: $input) {
    id
    nom
    niveau
    categorie {
      id
      nom
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "nom": "React",
    "niveau": 85,
    "categorie": "64abc123def456789"
  }
}
```

**Notes:**
- Le `niveau` doit être un nombre entier (généralement entre 0 et 100)
- La `categorie` doit être un ID valide d'une catégorie existante

### 2. Mettre à jour une compétence
```graphql
mutation UpdateCompetence($id: ID!, $input: UpdateCompetenceInput!) {
  updateCompetence(id: $id, input: $input) {
    id
    nom
    niveau
    categorie {
      id
      nom
    }
  }
}
```

**Variables (mise à jour du nom et du niveau):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "nom": "React Advanced",
    "niveau": 95
  }
}
```

**Variables (mise à jour du niveau uniquement):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "niveau": 90
  }
}
```

**Variables (changement de catégorie):**
```json
{
  "id": "64abc123def456789",
  "input": {
    "categorie": "64xyz987abc654321"
  }
}
```

### 3. Supprimer une compétence
```graphql
mutation DeleteCompetence($id: ID!) {
  deleteCompetence(id: $id)
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
- **Isolation des données:** Chaque utilisateur ne peut accéder qu'à ses propres compétences
- **Validation des permissions:** Les opérations de modification/suppression vérifient que la compétence appartient bien à l'utilisateur
- **Validation de la catégorie:** La catégorie fournie doit exister et appartenir à l'utilisateur

## Exemples d'utilisation

### Exemple complet: Créer, Lire, Mettre à jour, Supprimer

#### 1. Créer une compétence
```javascript
const CREATE_COMPETENCE = gql`
  mutation CreateCompetence($input: CreateCompetenceInput!) {
    createCompetence(input: $input) {
      id
      nom
      niveau
      categorie {
        id
        nom
      }
    }
  }
`;

const { data } = await client.mutate({
  mutation: CREATE_COMPETENCE,
  variables: {
    input: {
      nom: "TypeScript",
      niveau: 88,
      categorie: categorieId
    }
  }
});
```

#### 2. Lire toutes les compétences
```javascript
const GET_COMPETENCES = gql`
  query GetCompetences {
    getCompetences {
      id
      nom
      niveau
      categorie {
        id
        nom
      }
    }
  }
`;

const { data } = await client.query({
  query: GET_COMPETENCES
});
```

#### 3. Lire une compétence spécifique
```javascript
const GET_COMPETENCE = gql`
  query GetCompetence($id: ID!) {
    getCompetence(id: $id) {
      id
      nom
      niveau
      categorie {
        id
        nom
      }
    }
  }
`;

const { data } = await client.query({
  query: GET_COMPETENCE,
  variables: {
    id: competenceId
  }
});
```

#### 4. Mettre à jour une compétence
```javascript
const UPDATE_COMPETENCE = gql`
  mutation UpdateCompetence($id: ID!, $input: UpdateCompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      nom
      niveau
    }
  }
`;

const { data } = await client.mutate({
  mutation: UPDATE_COMPETENCE,
  variables: {
    id: competenceId,
    input: {
      niveau: 95
    }
  }
});
```

#### 5. Supprimer une compétence
```javascript
const DELETE_COMPETENCE = gql`
  mutation DeleteCompetence($id: ID!) {
    deleteCompetence(id: $id)
  }
`;

const { data } = await client.mutate({
  mutation: DELETE_COMPETENCE,
  variables: {
    id: competenceId
  }
});
```

## Gestion des erreurs

Les erreurs courantes retournées:

- `"Utilisateur non authentifié"` - L'utilisateur n'est pas connecté ou le token est invalide
- `"Compétence non trouvée"` - La compétence demandée n'existe pas
- `"Compétence non trouvée ou vous n'avez pas les permissions"` - La compétence existe mais n'appartient pas à l'utilisateur
- `"Erreur lors de la création de la compétence"` - Erreur lors de la création (ex: catégorie invalide)
- `"Erreur lors de la mise à jour de la compétence"` - Erreur lors de la mise à jour
- `"Erreur lors de la suppression de la compétence"` - Erreur lors de la suppression

## Bonnes pratiques

### Niveaux de compétence
Il est recommandé d'utiliser une échelle de 0 à 100 pour représenter le niveau de maîtrise:
- **0-25:** Débutant
- **26-50:** Intermédiaire
- **51-75:** Avancé
- **76-100:** Expert

### Catégories
Assurez-vous de créer d'abord les catégories nécessaires avant de créer des compétences. Exemples de catégories:
- Frontend
- Backend
- Base de données
- DevOps
- Outils
- Langages
- Frameworks

## Cas d'usage avancés

### Filtrer les compétences par niveau
Actuellement, vous devez récupérer toutes les compétences côté client et filtrer:
```javascript
const competences = await getCompetences();
const expertCompetences = competences.filter(c => c.niveau >= 76);
```

### Regrouper par catégorie
```javascript
const competences = await getCompetences();
const grouped = competences.reduce((acc, comp) => {
  const categorieName = comp.categorie?.nom || 'Sans catégorie';
  if (!acc[categorieName]) acc[categorieName] = [];
  acc[categorieName].push(comp);
  return acc;
}, {});
```

## Tests

Utilisez le fichier `tests/competences.rest` pour tester toutes les opérations CRUD avec l'extension REST Client de VS Code.

N'oubliez pas de:
1. Remplacer `YOUR_TOKEN_HERE` par votre token JWT
2. Remplacer `COMPETENCE_ID_HERE` par un ID de compétence valide
3. Remplacer `CATEGORIE_ID_HERE` par un ID de catégorie valide

## Intégration avec les Projets

Les compétences peuvent être liées aux projets. Lors de la création d'un projet, vous pouvez spécifier les IDs des compétences associées:

```graphql
mutation CreateProjet($input: CreateProjetInput!) {
  createProjet(input: $input) {
    id
    titre
    competences {
      id
      nom
      niveau
    }
  }
}
```

Variables:
```json
{
  "input": {
    "titre": "Mon Projet",
    "description": "Description",
    "competences": ["competenceId1", "competenceId2"]
  }
}
```
