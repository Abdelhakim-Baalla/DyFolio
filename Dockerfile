# Utiliser Node.js 18 Alpine (léger)
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build

# Exposer le port
EXPOSE 4000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=4000

# Créer le dossier logs
RUN mkdir -p logs

# Démarrer l'application
CMD ["npm", "start"]
