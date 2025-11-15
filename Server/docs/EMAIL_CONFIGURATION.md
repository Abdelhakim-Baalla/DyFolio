# Configuration de l'envoi d'emails - Formulaire de contact

## 📧 Vue d'ensemble

Le formulaire de contact de DyFolio permet aux visiteurs d'envoyer des messages directement à la boîte email du propriétaire du portfolio. Les emails sont envoyés via nodemailer depuis le backend.

## 🔧 Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `Server/` en vous basant sur `.env.example` :

```bash
# Configuration Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
```

### 2. Configuration Gmail (Recommandé)

Pour utiliser Gmail :

#### Étape 1 : Activer l'authentification à deux facteurs
1. Allez sur https://myaccount.google.com/security
2. Activez "Validation en deux étapes"

#### Étape 2 : Créer un mot de passe d'application
1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Courrier" et "Autre (nom personnalisé)"
3. Nommez-le "DyFolio"
4. Copiez le mot de passe de 16 caractères généré
5. Utilisez ce mot de passe dans `EMAIL_PASS` (pas votre mot de passe Gmail)

**Exemple de configuration Gmail :**
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votrecompte@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Mot de passe d'application (16 caractères)
```

### 3. Autres fournisseurs d'email

#### Outlook/Hotmail
```bash
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=votrecompte@outlook.com
EMAIL_PASS=votre_mot_de_passe
```

#### Yahoo
```bash
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=votrecompte@yahoo.com
EMAIL_PASS=votre_mot_de_passe_application
```

#### SMTP personnalisé
```bash
EMAIL_HOST=smtp.votredomaine.com
EMAIL_PORT=587  # ou 465 pour SSL
EMAIL_USER=contact@votredomaine.com
EMAIL_PASS=votre_mot_de_passe
```

## 🏗️ Architecture

### Backend (GraphQL)

**Schéma** (`Server/src/schema/index.ts`) :
```graphql
input SendContactEmailInput {
  username: String!
  nom: String!
  email: String!
  message: String!
}

type Mutation {
  sendContactEmail(input: SendContactEmailInput!): Boolean!
}
```

**Resolver** (`Server/src/resolvers/index.ts`) :
- Récupère l'email du propriétaire du portfolio via son `username`
- Appelle `emailService.sendContactEmail()` pour envoyer l'email
- Retourne `true` si l'envoi réussit, sinon lance une erreur

**Service Email** (`Server/src/utils/emailService.ts`) :
- Configure nodemailer avec les credentials depuis `.env`
- Crée un email HTML stylisé avec le design du portfolio
- Envoie l'email au propriétaire avec les informations du visiteur

### Frontend (React)

**Mutation** (`DyFolio-Front/src/graphql/mutations/sendContactEmail.js`) :
```graphql
mutation SendContactEmail($input: SendContactEmailInput!) {
  sendContactEmail(input: $input)
}
```

**Composant** (`DyFolio-Front/src/pages/Contact.jsx`) :
- Formulaire avec validation (nom min 2 chars, email valide, message min 10 chars)
- Utilise `useMutation` pour envoyer l'email
- Affiche un message de succès/erreur
- Réinitialise le formulaire après envoi réussi

## 🎨 Email HTML

Le template d'email inclut :
- Header avec dégradé bleu (#6fe7ff → #2b9cff)
- Informations du visiteur (nom et email)
- Message du visiteur
- Design responsive et moderne
- Footer avec logo DyFolio

## 📝 Flux de données

1. **Visiteur** remplit le formulaire sur `/:username/contact`
2. **Frontend** valide les données et appelle la mutation `sendContactEmail`
3. **Backend** reçoit : `username`, `nom`, `email`, `message`
4. **Resolver** trouve l'utilisateur par `username` et récupère son email
5. **EmailService** envoie l'email au propriétaire du portfolio
6. **Frontend** affiche un message de confirmation

## ⚠️ Sécurité

### Bonnes pratiques :
- ✅ L'email du propriétaire n'est jamais exposé au frontend
- ✅ Validation des données côté backend et frontend
- ✅ Rate limiting recommandé (à implémenter si nécessaire)
- ✅ Utilisation de mots de passe d'application (pas le mot de passe principal)

### Protection contre le spam :
Pour éviter les abus, vous pouvez ajouter :
- Captcha (Google reCAPTCHA)
- Rate limiting par IP
- Délai minimum entre deux envois
- Détection de contenu spam

## 🧪 Test

### Test manuel :
1. Configurez vos variables d'environnement dans `Server/.env`
2. Démarrez le serveur backend : `cd Server && npm run dev`
3. Démarrez le frontend : `cd DyFolio-Front && npm run dev`
4. Allez sur `http://localhost:3000/:username/contact`
5. Remplissez et soumettez le formulaire
6. Vérifiez votre boîte email

### Vérification des logs :
Les erreurs sont loguées dans la console du serveur :
```
Erreur sendContactEmail resolver: <message d'erreur>
```

## 🐛 Dépannage

### "Erreur lors de l'envoi du message"

**Causes possibles :**
1. **Credentials invalides** : Vérifiez `EMAIL_USER` et `EMAIL_PASS`
2. **2FA non configuré** : Pour Gmail, activez 2FA et utilisez un mot de passe d'application
3. **Port bloqué** : Vérifiez que le port 587 n'est pas bloqué par votre firewall
4. **Limite atteinte** : Gmail limite à ~500 emails/jour pour les comptes gratuits

**Solutions :**
- Vérifiez les logs du serveur pour plus de détails
- Testez avec un service de test SMTP comme Mailtrap
- Utilisez un service d'emailing dédié (SendGrid, Mailgun) pour la production

### L'email n'arrive pas

**Vérifiez :**
- Dossier spam/courrier indésirable
- Paramètres de sécurité Gmail : https://myaccount.google.com/lesssecureapps
- Configuration SMTP correcte
- Logs du serveur pour les erreurs d'envoi

## 🚀 Déploiement

### Variables d'environnement en production :

Ajoutez ces variables sur votre plateforme de déploiement :
- Heroku : `heroku config:set EMAIL_HOST=... EMAIL_PORT=... EMAIL_USER=... EMAIL_PASS=...`
- Vercel/Netlify : Ajoutez dans les paramètres d'environnement
- Docker : Ajoutez dans `docker-compose.yml` ou passez via `-e`

**⚠️ Important :** Ne commitez JAMAIS le fichier `.env` dans Git !

## 📚 Ressources

- [Documentation nodemailer](https://nodemailer.com/about/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Meilleures pratiques SMTP](https://postmarkapp.com/guides/smtp-best-practices)
