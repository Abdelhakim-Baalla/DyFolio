// src/index.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
const { expressMiddleware } = require('@apollo/server/express4');
import bodyParser from 'body-parser';
import cors from 'cors';
const schemaMod = require('./schema');
const typeDefs = schemaMod.typeDefs || schemaMod.default || schemaMod;
const resolversMod = require('./resolvers');
const resolvers = resolversMod.resolvers || resolversMod.default || resolversMod;
