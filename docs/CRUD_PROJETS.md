# CRUD Projets - Documentation

## Vue d'ensemble

Ce module implémente un CRUD complet (Create, Read, Update, Delete) pour gérer les projets via GraphQL.

## Types GraphQL

### Type Projet
```graphql
type Projet {
  id: ID!
  titre: String!
  description: String
  image: String
  lienDemo: String
  lienCode: String
  competences: [Competence!]!
}
```

### Input Types

#### CreateProjetInput
```graphql
input CreateProjetInput {
  titre: String!
  description: String
  image: String
  lienDemo: String
  lienCode: String
  competences: [ID!]
}
```

#### UpdateProjetInput
```graphql
input UpdateProjetInput {
  titre: String
  description: String
  image: String
  lienDemo: String
  lienCode: String
  competences: [ID!]
}
```

## Queries

### 1. Récupérer tous les projets de l'utilisateur connecté
```graphql
query GetProjets {
  getProjets {
    id
    titre
    description
    image
    lienDemo
    lienCode
    competences {
      nom
    }
  }
}
```

### 2. Récupérer un projet spécifique par ID
```graphql
query GetProjet($id: ID!) {
  getProjet(id: $id) {
    id
    titre
    description
    image
    lienDemo
    lienCode
    competences {
      nom
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

### 1. Créer un nouveau projet
```graphql
mutation CreateProjet($input: CreateProjetInput!) {
  createProjet(input: $input) {
    id
    titre
    description
    image
    lienDemo
    lienCode
    competences {
      nom
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "titre": "Mon Super Projet",
    "description": "Une description détaillée",
    "image": "https://example.com/image.jpg",
    "lienDemo": "https://demo.example.com",
    "lienCode": "https://github.com/user/projet",
    "competences": ["competenceId1", "competenceId2"]
  }
}
```

### 2. Mettre à jour un projet
```graphql
mutation UpdateProjet($id: ID!, $input: UpdateProjetInput!) {
  updateProjet(id: $id, input: $input) {
    id
    titre
    description
    image
    lienDemo
    lienCode
    competences {
      nom
    }
  }
}
```

**Variables:**
```json
{
  "id": "64abc123def456789",
  "input": {
    "titre": "Titre mis à jour",
    "description": "Description mise à jour"
  }
}
```

### 3. Supprimer un projet
```graphql
mutation DeleteProjet($id: ID!) {
  deleteProjet(id: $id)
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
- **Isolation des données:** Chaque utilisateur ne peut accéder qu'à ses propres projets
- **Validation des permissions:** Les opérations de modification/suppression vérifient que le projet appartient bien à l'utilisateur

## Exemples d'utilisation

### Exemple complet: Créer, Lire, Mettre à jour, Supprimer

1. **Créer un projet**
```javascript
const CREATE_PROJET = gql`
  mutation CreateProjet($input: CreateProjetInput!) {
    createProjet(input: $input) {
      id
      titre
    }
  }
`;

const { data } = await client.mutate({
  mutation: CREATE_PROJET,
  variables: {
    input: {
      titre: "Mon Portfolio",
      description: "Un site moderne"
    }
  }
});
```

2. **Lire tous les projets**
```javascript
const GET_PROJETS = gql`
  query GetProjets {
    getProjets {
      id
      titre
      description
    }
  }
`;

const { data } = await client.query({
  query: GET_PROJETS
});
```

3. **Mettre à jour un projet**
```javascript
const UPDATE_PROJET = gql`
  mutation UpdateProjet($id: ID!, $input: UpdateProjetInput!) {
    updateProjet(id: $id, input: $input) {
      id
      titre
    }
  }
`;

const { data } = await client.mutate({
  mutation: UPDATE_PROJET,
  variables: {
    id: projetId,
    input: {
      titre: "Nouveau titre"
    }
  }
});
```

4. **Supprimer un projet**
```javascript
const DELETE_PROJET = gql`
  mutation DeleteProjet($id: ID!) {
    deleteProjet(id: $id)
  }
`;

const { data } = await client.mutate({
  mutation: DELETE_PROJET,
  variables: {
    id: projetId
  }
});
```

## Gestion des erreurs

Les erreurs courantes retournées:

- `"Utilisateur non authentifié"` - L'utilisateur n'est pas connecté ou le token est invalide
- `"Projet non trouvé"` - Le projet demandé n'existe pas
- `"Projet non trouvé ou vous n'avez pas les permissions"` - Le projet existe mais n'appartient pas à l'utilisateur
- `"Erreur lors de la création du projet"` - Erreur lors de la création
- `"Erreur lors de la mise à jour du projet"` - Erreur lors de la mise à jour
- `"Erreur lors de la suppression du projet"` - Erreur lors de la suppression

## Tests

Utilisez le fichier `tests/projets.rest` pour tester toutes les opérations CRUD avec l'extension REST Client de VS Code.

N'oubliez pas de:
1. Remplacer `YOUR_TOKEN_HERE` par votre token JWT
2. Remplacer `PROJET_ID_HERE` par un ID de projet valide
3. Remplacer `COMPETENCE_ID_X` par des IDs de compétences valides
