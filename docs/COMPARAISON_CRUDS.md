# Comparaison CRUD Projets vs Compétences

## 📊 Tableau comparatif

| Caractéristique | Projets | Compétences |
|----------------|---------|-------------|
| **Champs obligatoires** | `titre` | `nom`, `niveau`, `categorie` |
| **Champs optionnels** | `description`, `image`, `lienDemo`, `lienCode`, `competences[]` | - |
| **Relations** | Utilisateur (1:N), Compétences (N:N) | Utilisateur (1:N), Catégorie (N:1) |
| **Niveau d'imbrication** | Peut contenir plusieurs compétences | Contient une catégorie |
| **Type de données spécial** | URLs (liens) | Nombre entier (niveau) |

## 🔄 Opérations CRUD

### CREATE (Créer)

#### Projet
```graphql
mutation {
  createProjet(input: {
    titre: "Mon Projet"           # Requis
    description: "Description"     # Optionnel
    image: "url"                   # Optionnel
    lienDemo: "url"                # Optionnel
    lienCode: "url"                # Optionnel
    competences: ["id1", "id2"]    # Optionnel
  }) {
    id
    titre
  }
}
```

#### Compétence
```graphql
mutation {
  createCompetence(input: {
    nom: "React"                   # Requis
    niveau: 85                     # Requis
    categorie: "categorieId"       # Requis
  }) {
    id
    nom
  }
}
```

**Différences clés:**
- ✅ Projet: Plus de champs mais la plupart optionnels
- ✅ Compétence: Moins de champs mais tous requis (sauf nom)
- ✅ Projet: Peut référencer plusieurs compétences
- ✅ Compétence: Doit référencer UNE catégorie

---

### READ (Lire)

#### Tous les éléments

**Projets:**
```graphql
query {
  getProjets {
    id
    titre
    description
    competences {
      nom
      niveau
    }
  }
}
```

**Compétences:**
```graphql
query {
  getCompetences {
    id
    nom
    niveau
    categorie {
      nom
    }
  }
}
```

#### Un seul élément

**Projet:**
```graphql
query {
  getProjet(id: "projetId") {
    id
    titre
  }
}
```

**Compétence:**
```graphql
query {
  getCompetence(id: "competenceId") {
    id
    nom
  }
}
```

**Similarités:**
- ✅ Même structure de query avec ID
- ✅ Populate automatique des relations
- ✅ Vérification d'appartenance à l'utilisateur

---

### UPDATE (Mettre à jour)

#### Projet
```graphql
mutation {
  updateProjet(
    id: "projetId"
    input: {
      titre: "Nouveau titre"
      description: "Nouvelle description"
    }
  ) {
    id
    titre
  }
}
```

#### Compétence
```graphql
mutation {
  updateCompetence(
    id: "competenceId"
    input: {
      nom: "React Advanced"
      niveau: 95
    }
  ) {
    id
    nom
  }
}
```

**Similarités:**
- ✅ Tous les champs de l'input sont optionnels
- ✅ Seuls les champs fournis sont mis à jour
- ✅ Vérification de propriété avant mise à jour

---

### DELETE (Supprimer)

#### Projet
```graphql
mutation {
  deleteProjet(id: "projetId")
}
```

#### Compétence
```graphql
mutation {
  deleteCompetence(id: "competenceId")
}
```

**Similarités:**
- ✅ Retourne Boolean (true si succès)
- ✅ Vérification de propriété avant suppression
- ✅ Même pattern de gestion d'erreurs

---

## 🔒 Sécurité

### Projets
```typescript
// Vérification utilisateur
const existingProjet = await Projet.findOne({ 
  _id: id, 
  utilisateur: utilisateurId 
});

if (!existingProjet) {
  throw new Error('Projet non trouvé ou vous n\'avez pas les permissions');
}
```

### Compétences
```typescript
// Vérification utilisateur
const existingCompetence = await Competence.findOne({ 
  _id: id, 
  utilisateur: utilisateurId 
});

if (!existingCompetence) {
  throw new Error('Compétence non trouvée ou vous n\'avez pas les permissions');
}
```

**Pattern identique:** Même approche de sécurité pour les deux entités.

---

## 📦 Modèles Mongoose

### Projet
```typescript
{
  titre: String (required)
  description: String
  image: String
  lienDemo: String
  lienCode: String
  competences: [ObjectId] → Competence
  utilisateur: ObjectId → Utilisateur (required)
}
```

### Compétence
```typescript
{
  nom: String (required)
  niveau: Number (required)
  categorie: ObjectId → Categorie (required)
  utilisateur: ObjectId → Utilisateur (required)
}
```

---

## 🎯 Cas d'usage

### Projets
- Portfolio de développeur
- Showcase de travaux
- Démonstration de compétences en action
- Liens vers repos GitHub et démos live

### Compétences
- Liste de technologies maîtrisées
- Évaluation de niveau de maîtrise
- Organisation par catégories (Frontend, Backend, etc.)
- Référence dans les projets

---

## 🔗 Relations entre entités

```
Projet ────N:N────▶ Competence
  │                     │
  │                     │
  1:N                  1:N
  │                     │
  ▼                     ▼
Utilisateur          Utilisateur
                        ▲
                        │
                       1:N
                        │
                     Categorie
```

**Explications:**
- Un **Projet** peut utiliser plusieurs **Compétences** (N:N)
- Une **Compétence** appartient à une **Catégorie** (N:1)
- Chaque entité appartient à un **Utilisateur** (1:N)

---

## 💡 Bonnes pratiques

### Pour les Projets
1. ✅ Toujours renseigner le titre (obligatoire)
2. ✅ Ajouter une description claire
3. ✅ Lier aux compétences utilisées
4. ✅ Fournir des liens de démo si disponibles
5. ✅ Utiliser des URLs valides pour images et liens

### Pour les Compétences
1. ✅ Utiliser une échelle cohérente pour le niveau (0-100)
2. ✅ Associer à une catégorie pertinente
3. ✅ Nommer clairement (ex: "React" pas "react" ou "ReactJS")
4. ✅ Mettre à jour régulièrement les niveaux
5. ✅ Créer les catégories avant les compétences

---

## 🚀 Utilisation conjointe

### Créer un projet avec ses compétences

```graphql
# 1. Créer d'abord les compétences
mutation {
  comp1: createCompetence(input: {
    nom: "React"
    niveau: 90
    categorie: "frontendCatId"
  }) { id }
  
  comp2: createCompetence(input: {
    nom: "Node.js"
    niveau: 85
    categorie: "backendCatId"
  }) { id }
}

# 2. Créer le projet avec les compétences
mutation {
  createProjet(input: {
    titre: "Application Full Stack"
    description: "Une app complète React + Node"
    competences: ["comp1Id", "comp2Id"]
  }) {
    id
    titre
    competences {
      nom
      niveau
    }
  }
}
```

### Récupérer un portfolio complet

```graphql
query {
  getPortfolio {
    profil {
      nom
      prenom
      metier
    }
    projets {
      id
      titre
      competences {
        nom
        niveau
      }
    }
    competences {
      id
      nom
      niveau
      categorie {
        nom
      }
    }
  }
}
```

---

## 📈 Statistiques possibles

### Pour les Projets
- Nombre total de projets
- Projets par compétence
- Projets avec/sans démo
- Projets avec/sans code source

### Pour les Compétences
- Nombre total de compétences
- Niveau moyen par catégorie
- Compétences les plus utilisées dans les projets
- Distribution des niveaux (débutant/avancé/expert)

---

## 🔧 Extensibilité future

### Projets
- [ ] Tags/mots-clés
- [ ] Date de création/publication
- [ ] Statut (en cours, terminé, archivé)
- [ ] Collaborateurs
- [ ] Nombre de vues/likes

### Compétences
- [ ] Date d'acquisition
- [ ] Certificats associés
- [ ] Dernière utilisation
- [ ] Années d'expérience
- [ ] Auto-évaluation vs évaluation externe

---

**Conclusion:** Les deux CRUDs suivent le même pattern architectural, ce qui facilite la maintenance et l'ajout de nouvelles entités similaires.
