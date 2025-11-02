import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const Models = require('../models');
const Utilisateur = Models.Utilisateur;

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      logger.warn('Tentative d\'inscription avec des données manquantes');
      return res.status(400).json({ message: 'username, email et password requis' });
    }

    const existing = await Utilisateur.findOne({ email }).lean();
    if (existing) {
      logger.warn(`Tentative d'inscription avec un email déjà existant: ${email}`);
      return res.status(409).json({ message: 'Utilisateur déjà existant pour cet email' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await Utilisateur.create({ username, email, password: hashed });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      logger.error('JWT secret not set');
      return res.status(500).json({ message: 'JWT secret non configuré' });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    
    logger.info(`Nouvel utilisateur inscrit: ${username} (${email})`);
    return res.status(201).json({ user: { id: user._id, username: user.username, email: user.email }, token: token });
  } catch (err) {
    logger.error('Erreur lors de l\'inscription', err);
    return res.status(500).json({ message: "Erreur interne lors de la création de l'utilisateur" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      logger.warn('Tentative de connexion avec des données manquantes');
      return res.status(400).json({ message: 'email et password requis' });
    }

    const user = await Utilisateur.findOne({ email });
    if (!user) {
      logger.warn(`Tentative de connexion avec un email inexistant: ${email}`);
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      logger.warn(`Tentative de connexion avec un mot de passe invalide pour: ${email}`);
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      logger.error('JWT secret not set');
      return res.status(500).json({ message: 'JWT secret non configuré' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });

    logger.info(`Utilisateur connecté: ${user.username} (${email})`);
    return res.json({ user: { id: user._id, username: user.username, email: user.email }, token: token });
  } catch (err) {
    logger.error('Erreur lors de la connexion', err);
    return res.status(500).json({ message: 'Erreur interne lors de la connexion' });
  }
};

export default {
  register,
  login,
};