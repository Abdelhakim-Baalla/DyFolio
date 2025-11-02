import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import morgan from 'morgan';
import jwtMiddleware from './middlewares/jwt';
import authRouter from './routes/auth';
import logger from './config/logger';
import { morganStream } from './utils/morganStream';
const schemaMod = require('./schema');
const typeDefs = schemaMod.typeDefs;
const resolversMod = require('./resolvers');
const resolvers = resolversMod.resolvers;
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
connectDB();
const Models = require('./models/index');
const { Utilisateur } = Models;
const PORT = process.env.PORT || 4000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await server.start();
    logger.info('Apollo Server démarré avec succès');
    
    // Middlewares
    app.use(cors());
    app.use(express.json());
    
    // Journalisation HTTP avec Morgan
    app.use(morgan('combined', { stream: morganStream }));
    
    // Routes
    app.use('/api/v1', authRouter);
    app.use(jwtMiddleware);
    app.use('/graphql', expressMiddleware(server, { context: async ({ req }) => ({ user: (req as any).user }), }));

    // Lancement du serveur
    app.listen(PORT, () => {
      logger.info(`Serveur en marche sur http://localhost:${PORT}`);
      logger.info(`GraphQL disponible sur http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    logger.error('Erreur lors du démarrage du serveur', error);
    process.exit(1);
  }
}

startServer();
