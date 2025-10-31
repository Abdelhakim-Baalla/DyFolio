import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
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
  await server.start();
  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  // Lancement du serveur
  app.listen(PORT, () => {
    console.log(`Serveur en marche sur http://localhost:${PORT}/graphql`);
  });
}

startServer();
