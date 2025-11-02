# Documentation de Validation Joi

##  Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Installation](#installation)
- [Structure des validateurs](#structure-des-validateurs)
- [Validateurs Projets](#validateurs-projets)
- [Validateurs Compétences](#validateurs-compétences)
- [Validateurs Expériences](#validateurs-expériences)
- [Intégration dans les Resolvers](#intégration-dans-les-resolvers)
- [Messages d'erreur personnalisés](#messages-derreur-personnalisés)
- [Règles de validation](#règles-de-validation)

---

##  Vue d'ensemble

La validation Joi a été intégrée dans tous les resolvers GraphQL pour garantir l'intégrité des données avant leur traitement. Chaque input est validé selon des règles strictes avec des messages d'erreur personnalisés en français.

### Avantages

[OK] **Validation précoce** : Les erreurs sont détectées avant l'accès à la base de données
[OK] **Messages clairs** : Messages d'erreur en français, faciles à comprendre
[OK] **Type safety** : Validation des types, formats et contraintes
[OK] **Sécurité** : Protection contre les données malformées
[OK] **Cohérence** : Règles uniformes sur toutes les entités

---

##  Installation

```bash
npm install joi
```

**Version installée** : Dernière version stable de Joi

---

##  Structure des validateurs

```
src/
└── validators/
    ├── index.ts                    # Export centralisé
    ├── projet.validator.ts         # Validateurs pour Projets
    ├── competence.validator.ts     # Validateurs pour Compétences
    └── experience.validator.ts     # Validateurs pour Expériences
```

---

##  Validateurs Projets

### `createProjetSchema`

Validation pour la création d'un projet.

**Champs requis :**

- `titre` : String (3-100 caractères)
- `description` : String (10-2000 caractères)
- `technologies` : Array de strings (min 1 élément)

**Champs optionnels :**

- `lienGithub` : URL valide ou vide
- `lienDemo` : URL valide ou vide
- `images` : Array d'URLs valides
- `competences` : Array d'IDs MongoDB valides

**Exemple d'utilisation :**

```javascript
const { error, value } = createProjetSchema.validate(input, { abortEarly: false });
if (error) {
  const errorMessages = error.details.map(detail => detail.message).join(', ');
  throw new Error(`Erreur de validation: ${errorMessages}`);
}
```

### `updateProjetSchema`

Validation pour la mise à jour d'un projet.

**Différences avec create :**

- Tous les champs sont optionnels
- Au moins un champ doit être fourni
- Mêmes règles de validation que create pour les champs fournis

### `projetIdSchema`

Validation pour l'ID d'un projet.

**Règles :**

- Format MongoDB ObjectId (24 caractères hexadécimaux)
- Obligatoire

---

##  Validateurs Compétences

### `createCompetenceSchema`

Validation pour la création d'une compétence.

**Champs requis :**

- `nom` : String (2-50 caractères)
- `niveau` : Integer (1-5)
- `categorie` : ID MongoDB valide

**Champs optionnels :**

- `description` : String (10-500 caractères) ou vide
- `icone` : URL valide ou vide

**Validation du niveau :**

```javascript
niveau: Joi.number()
  .integer()
  .min(1)
  .max(5)
  .required()
```

Le niveau doit être un entier entre 1 (débutant) et 5 (expert).

### `updateCompetenceSchema`

Validation pour la mise à jour d'une compétence.

**Caractéristiques :**

- Tous les champs sont optionnels
- Au moins un champ doit être fourni
- Validation du niveau (1-5) si fourni
- Validation de l'ID de catégorie si fourni

### `competenceIdSchema`

Validation pour l'ID d'une compétence (même règles que `projetIdSchema`).

---

##  Validateurs Expériences

### `createExperienceSchema`

Validation pour la création d'une expérience professionnelle.

**Champs requis :**

- `poste` : String (3-100 caractères)
- `entreprise` : String (2-100 caractères)
- `description` : String (10-2000 caractères)

**Champs optionnels :**

- `dateDebut` : Date au format ISO 8601 (ex: "2024-01-01")
- `dateFin` : Date au format ISO 8601 ou null (pour expérience en cours)
- `lieu` : String (2-100 caractères) ou vide
- `type` : Enum ('CDI', 'CDD', 'Stage', 'Freelance', 'Alternance')
- `competences` : Array d'IDs MongoDB valides

**Validation personnalisée :**

```javascript
.custom((value, helpers) => {
  if (value.dateDebut && value.dateFin) {
    const debut = new Date(value.dateDebut);
    const fin = new Date(value.dateFin);
    if (fin <= debut) {
      return helpers.error('any.custom', { 
        message: 'La date de fin doit être postérieure à la date de début' 
      });
    }
  }
  return value;
})
```

Cette validation garantit que `dateFin` est toujours après `dateDebut`.

### `updateExperienceSchema`

Validation pour la mise à jour d'une expérience.

**Caractéristiques :**

- Tous les champs sont optionnels
- Au moins un champ doit être fourni
- Validation personnalisée des dates si fournies
- Validation du type si fourni

### `experienceIdSchema`

Validation pour l'ID d'une expérience (même règles que `projetIdSchema`).

---

##  Intégration dans les Resolvers

### Import des validateurs

```typescript
import {
  createProjetSchema,
  updateProjetSchema,
  projetIdSchema,
  createCompetenceSchema,
  updateCompetenceSchema,
  competenceIdSchema,
  createExperienceSchema,
  updateExperienceSchema,
  experienceIdSchema
} from '../validators';
```

### Pattern de validation dans les mutations

**1. Validation des données d'entrée (create/update) :**

```typescript
const { error, value } = createProjetSchema.validate(args.input, { abortEarly: false });
if (error) {
  const errorMessages = error.details.map(detail => detail.message).join(', ');
  throw new Error(`Erreur de validation: ${errorMessages}`);
}
```

**2. Validation de l'ID (update/delete) :**

```typescript
const { error: idError } = projetIdSchema.validate(id);
if (idError) {
  throw new Error(`Erreur de validation: ${idError.message}`);
}
```

### Ordre d'exécution dans les resolvers

1. [OK] Extraction du token JWT et validation de l'authentification
2. [OK] **Validation Joi des données d'entrée** (nouveau)
3. [OK] Vérification des permissions (ownership)
4. [OK] Opération sur la base de données
5. [OK] Retour de la réponse

---

##  Messages d'erreur personnalisés

Tous les validateurs utilisent des messages d'erreur en français pour une meilleure expérience utilisateur.

### Exemples de messages

**Type invalide :**
```
Le titre doit être une chaîne de caractères
```

**Champ vide :**
```
Le titre ne peut pas être vide
```

**Longueur invalide :**
```
Le titre doit contenir au moins 3 caractères
Le titre ne peut pas dépasser 100 caractères
```

**Format invalide :**
```
Le lien GitHub doit être une URL valide
L'ID du projet doit être un ID MongoDB valide
```

**Valeur hors limites :**
```
Le niveau doit être au minimum 1
Le niveau doit être au maximum 5
```

**Enum invalide :**
```
Le type doit être: CDI, CDD, Stage, Freelance ou Alternance
```

**Validation personnalisée :**
```
La date de fin doit être postérieure à la date de début
```

**Update sans changement :**
```
Au moins un champ doit être fourni pour la mise à jour
```

---

##  Règles de validation

### Règles communes

| Règle | Description | Exemple |
|-------|-------------|---------|
| `required()` | Champ obligatoire | `nom: Joi.string().required()` |
| `optional()` | Champ optionnel | `icone: Joi.string().optional()` |
| `min(n)` | Longueur/valeur minimale | `titre: Joi.string().min(3)` |
| `max(n)` | Longueur/valeur maximale | `titre: Joi.string().max(100)` |
| `allow('', null)` | Autoriser vide ou null | `dateFin: Joi.string().allow(null)` |

### Règles par type

#### String

```javascript
nom: Joi.string()
  .min(2)           // Minimum 2 caractères
  .max(50)          // Maximum 50 caractères
  .required()       // Obligatoire
```

#### Number

```javascript
niveau: Joi.number()
  .integer()        // Doit être un entier
  .min(1)           // Minimum 1
  .max(5)           // Maximum 5
  .required()       // Obligatoire
```

#### URL

```javascript
lienGithub: Joi.string()
  .uri()            // Doit être une URL valide
  .allow('', null)  // Peut être vide ou null
  .optional()       // Optionnel
```

#### Date ISO

```javascript
dateDebut: Joi.string()
  .isoDate()        // Format ISO 8601
  .optional()       // Optionnel
```

#### Array

```javascript
technologies: Joi.array()
  .items(Joi.string())  // Items de type string
  .min(1)               // Au moins 1 élément
  .required()           // Obligatoire
```

#### MongoDB ObjectId

```javascript
categorie: Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)  // Format ObjectId
  .required()                   // Obligatoire
```

#### Enum

```javascript
type: Joi.string()
  .valid('CDI', 'CDD', 'Stage', 'Freelance', 'Alternance')
  .optional()
```

### Validation personnalisée

Pour des règles métier complexes :

```javascript
.custom((value, helpers) => {
  // Logique de validation personnalisée
  if (condition) {
    return helpers.error('any.custom', { message: 'Message personnalisé' });
  }
  return value;
})
```

**Exemple :** Validation des dates d'expérience (dateFin > dateDebut)

---

##  Tests de validation

### Scénarios testés

1. [OK] **Création avec données valides** : Succès
2. [OK] **Création avec champ manquant** : Erreur avec message explicite
3. [OK] **Création avec type invalide** : Erreur de type
4. [OK] **Création avec longueur invalide** : Erreur de longueur
5. [OK] **Update avec au moins un champ** : Succès
6. [OK] **Update sans aucun champ** : Erreur "au moins un champ requis"
7. [OK] **ID invalide** : Erreur de format
8. [OK] **Date de fin avant date de début** : Erreur de validation personnalisée

### Exemple de test dans REST Client

```graphql
### Test validation - Titre trop court (doit échouer)
POST http://localhost:4000/graphql
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "query": "mutation { createProjet(input: { titre: \"AB\", description: \"Description valide\", technologies: [\"React\"] }) { id titre } }"
}
```

**Réponse attendue :**
```json
{
  "errors": [
    {
      "message": "Erreur de validation: Le titre doit contenir au moins 3 caractères"
    }
  ]
}
```

---

##  Résumé des validations par entité

### Projets

| Champ | Type | Contraintes | Requis |
|-------|------|-------------|--------|
| titre | String | 3-100 car. | [OK] Create |
| description | String | 10-2000 car. | [OK] Create |
| technologies | Array[String] | Min 1 élément | [OK] Create |
| lienGithub | URL | Format URL | [ERREUR] |
| lienDemo | URL | Format URL | [ERREUR] |
| images | Array[URL] | Format URL | [ERREUR] |
| competences | Array[ObjectId] | Format MongoDB | [ERREUR] |

### Compétences

| Champ | Type | Contraintes | Requis |
|-------|------|-------------|--------|
| nom | String | 2-50 car. | [OK] Create |
| niveau | Integer | 1-5 | [OK] Create |
| categorie | ObjectId | Format MongoDB | [OK] Create |
| description | String | 10-500 car. | [ERREUR] |
| icone | URL | Format URL | [ERREUR] |

### Expériences

| Champ | Type | Contraintes | Requis |
|-------|------|-------------|--------|
| poste | String | 3-100 car. | [OK] Create |
| entreprise | String | 2-100 car. | [OK] Create |
| description | String | 10-2000 car. | [OK] Create |
| dateDebut | Date ISO | Format ISO 8601 | [ERREUR] |
| dateFin | Date ISO | Format ISO 8601, > dateDebut | [ERREUR] |
| lieu | String | 2-100 car. | [ERREUR] |
| type | Enum | CDI/CDD/Stage/Freelance/Alternance | [ERREUR] |
| competences | Array[ObjectId] | Format MongoDB | [ERREUR] |

---

##  Sécurité

La validation Joi ajoute une couche de sécurité importante :

1. **Protection contre les injections** : Validation des formats et types
2. **Prévention des débordements** : Limites de longueur strictes
3. **Validation des références** : IDs MongoDB valides uniquement
4. **Cohérence des données** : Règles métier appliquées (ex: dates)
5. **Messages sécurisés** : Pas de fuite d'information sensible

---

##  Notes importantes

1. [ATTENTION] **Option `abortEarly: false`** : Permet de retourner toutes les erreurs en une fois, pas seulement la première
2. [ATTENTION] **Validation avant authentification** : Non, l'authentification est vérifiée en premier pour des raisons de sécurité
3. [ATTENTION] **Validation côté client** : Cette validation est côté serveur. Pensez à ajouter aussi une validation côté client pour une meilleure UX
4. [ATTENTION] **Performance** : La validation Joi est rapide, mais elle ajoute un léger overhead. C'est un compromis acceptable pour la sécurité

---

##  Prochaines étapes

- [ ] Ajouter des validateurs pour les Catégories
- [ ] Implémenter la validation du Profil
- [ ] Ajouter des tests unitaires pour chaque validateur
- [ ] Créer un middleware de validation réutilisable
- [ ] Documenter les patterns de validation pour les nouvelles entités

---

**Date de création** : 2 novembre 2025  
**Version** : 1.0  
**Auteur** : DyFolio Development Team
