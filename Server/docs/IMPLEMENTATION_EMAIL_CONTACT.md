# ✅ Fonctionnalité d'envoi d'email - Formulaire de contact

## 📋 Résumé

Implémentation complète de l'envoi d'emails depuis le formulaire de contact du portfolio. Lorsqu'un visiteur clique sur "Envoyer le message", le message est envoyé directement à la boîte email du propriétaire du portfolio.

## 🎯 Fichiers créés/modifiés

### Backend

1. **`Server/src/utils/emailService.ts`** (CRÉÉ)
   - Service d'envoi d'emails avec nodemailer
   - Configuration SMTP via variables d'environnement
   - Template HTML stylisé avec design gradient
   - Fonction `sendContactEmail(ownerEmail, senderName, senderEmail, message)`

2. **`Server/src/schema/index.ts`** (MODIFIÉ)
   - Ajout de `input SendContactEmailInput`
   - Ajout de `sendContactEmail(input: SendContactEmailInput!): Boolean!` dans Mutation

3. **`Server/src/resolvers/index.ts`** (MODIFIÉ)
   - Ajout du resolver `sendContactEmail`
   - Récupère l'email du propriétaire via username
   - Appelle le service emailService
   - Gestion des erreurs

4. **`Server/.env.example`** (MODIFIÉ)
   - Ajout de variables EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
   - Instructions pour configurer Gmail avec mot de passe d'application

5. **`Server/docs/EMAIL_CONFIGURATION.md`** (CRÉÉ)
   - Documentation complète de la configuration
   - Guide pas-à-pas pour Gmail, Outlook, Yahoo
   - Troubleshooting et bonnes pratiques
   - Architecture et flux de données

### Frontend

6. **`DyFolio-Front/src/graphql/mutations/sendContactEmail.js`** (CRÉÉ)
   - Mutation GraphQL `SEND_CONTACT_EMAIL`
   - Input: username, nom, email, message

7. **`DyFolio-Front/src/pages/Contact.jsx`** (MODIFIÉ)
   - Import de `useMutation` et `SEND_CONTACT_EMAIL`
   - Fonction `handleSubmit` mise à jour pour appeler la mutation
   - Envoi des données du formulaire au backend
   - Affichage des messages de succès/erreur

## 🔧 Configuration requise

### 1. Créer le fichier .env

Créez `Server/.env` avec :

```bash
# ... autres variables existantes ...

# Configuration Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
```

### 2. Configurer Gmail (Recommandé)

**Étape 1 - Activer l'authentification à deux facteurs :**
- Allez sur https://myaccount.google.com/security
- Activez "Validation en deux étapes"

**Étape 2 - Créer un mot de passe d'application :**
- Allez sur https://myaccount.google.com/apppasswords
- Sélectionnez "Courrier" et "Autre"
- Copiez le mot de passe de 16 caractères
- Utilisez-le dans `EMAIL_PASS`

## 🚀 Test

1. **Démarrer le backend :**
   ```bash
   cd Server
   npm run dev
   ```

2. **Démarrer le frontend :**
   ```bash
   cd DyFolio-Front
   npm run dev
   ```

3. **Tester le formulaire :**
   - Allez sur `http://localhost:3000/:username/contact`
   - Remplissez le formulaire
   - Cliquez sur "Envoyer le message"
   - Vérifiez votre boîte email

## ✨ Fonctionnalités

### Validation du formulaire
- **Nom** : minimum 2 caractères
- **Email** : format email valide
- **Message** : minimum 10 caractères

### Email envoyé
- **Design** : Template HTML avec gradient bleu (#6fe7ff → #2b9cff)
- **Contenu** : Nom et email du visiteur + message
- **Destinataire** : Email du propriétaire du portfolio (depuis base de données)
- **Expéditeur** : EMAIL_USER configuré dans .env

### Retour utilisateur
- **Succès** : Message vert avec icône de validation
- **Erreur** : Message rouge avec icône d'alerte
- **Chargement** : Bouton désactivé pendant l'envoi
- **Réinitialisation** : Formulaire vidé après envoi réussi

## 🔒 Sécurité

- ✅ Email du propriétaire jamais exposé au frontend
- ✅ Validation côté backend ET frontend
- ✅ Utilisation de mot de passe d'application (pas le mot de passe principal)
- ✅ Gestion des erreurs sans exposer d'informations sensibles

## 📝 Architecture

```
Visiteur (Contact.jsx)
    ↓ [Mutation GraphQL]
Backend (sendContactEmail resolver)
    ↓ [Trouve utilisateur par username]
Database (Récupère email du propriétaire)
    ↓
EmailService (sendContactEmail)
    ↓ [nodemailer + SMTP]
Boîte email du propriétaire ✉️
```

## 📦 Dépendances

Déjà installées dans le projet :
- `nodemailer@^7.0.10` (Backend)
- `@types/nodemailer@^7.0.3` (Backend)
- `@apollo/client` (Frontend)

## 📚 Documentation

Pour plus de détails, consultez :
- `Server/docs/EMAIL_CONFIGURATION.md` - Configuration complète et troubleshooting

## ⚠️ Important

**Ne commitez JAMAIS le fichier `.env` dans Git !**

Le fichier `.env` contient des informations sensibles (mot de passe email). Il doit rester local et être ajouté à `.gitignore`.

## 🎉 Résultat

Le formulaire de contact est maintenant entièrement fonctionnel ! Les visiteurs peuvent envoyer des messages directement au propriétaire du portfolio depuis la page Contact.
