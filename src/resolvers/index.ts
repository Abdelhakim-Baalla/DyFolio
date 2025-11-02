const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

export const resolvers = {
  Query: {
    getProfil: async (_parent: any, _args: any, context: any) => {
      try {
        const Profil = Models.Profil;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const profil = await Profil.findOne({ utilisateur: utilisateurId }).lean();

        if (!profil) {
          throw new Error('Profil non trouvé pour cet utilisateur');
        }

        return {
          nom: profil.nom || '',
          prenom: profil.prenom || '',
          metier: profil.metier || '',
          bio: profil.bio || '',
          photo: profil.photo || '',
          reseauxSociaux: profil.reseauxSociaux || [],
          localisation: profil.localisation || '',
        };
      } catch (err: any) {
        console.error('Erreur getProfil:', err?.message || err);
        if (err instanceof Error && (err.message === 'Utilisateur non authentifié' || err.message.startsWith('Profil non trouvé')) ) {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération du profil');
      }
    },
    getProjets: async (_parent: any, _args: any, context: any) => {
      try {
        const Projet = Models.Projet;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const projets = await Projet.find({ utilisateur: utilisateurId }).populate('competences', 'nom').lean();

        if (!projets || projets.length === 0) {
          return [];
        }

        return projets.map((p: any) => ({
          titre: p.titre || '',
          description: p.description || '',
          image: p.image || '',
          lienDemo: p.lienDemo || '',
          lienCode: p.lienCode || '',
          competences: Array.isArray(p.competences)
            ? p.competences.map((c: any) => ({ nom: c && c.nom ? c.nom : '' }))
            : [],
        }));
      } catch (err: any) {
        console.error('Erreur getProjets:', err?.message || err);
        if (err instanceof Error && err.message === 'Utilisateur non authentifié') {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération des projets');
      }
    },
    getCompetences: async (_parent: any, _args: any, context: any) => {
      try {
        const Competence = Models.Competence;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const competences = await Competence.find({ utilisateur: utilisateurId }).populate('categorie', 'nom').lean();

        if (!competences || competences.length === 0) {
          return [];
        }

        return competences.map((c: any) => ({
          nom: c.nom || '',
          niveau: typeof c.niveau === 'number' ? c.niveau : 0,
          categorie: c.categorie && c.categorie.nom ? { nom: c.categorie.nom } : null,
        }));
      } catch (err: any) {
        console.error('Erreur getCompetences:', err?.message || err);
        if (err instanceof Error && err.message === 'Utilisateur non authentifié') {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération des compétences');
      }
    },
    getExperiences: async (_parent: any, _args: any, context: any) => {
      try {
        const Experience = Models.Experience;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const experiences = await Experience.find({ utilisateur: utilisateurId }).lean();

        if (!experiences || experiences.length === 0) {
          return [];
        }

        return experiences.map((e: any) => ({
          poste: e.poste || '',
          entreprise: e.entreprise || '',
          description: e.description || '',
          dateDebut: e.dateDebut ? new Date(e.dateDebut).toISOString() : null,
          dateFin: e.dateFin ? new Date(e.dateFin).toISOString() : null,
        }));
      } catch (err: any) {
        console.error('Erreur getExperiences:', err?.message || err);
        if (err instanceof Error && err.message === 'Utilisateur non authentifié') {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération des expériences');
      }
    },
    getPortfolio: async (_parent: any, _args: any, context: any) => {
      try {
        const Profil = Models.Profil;
        const Projet = Models.Projet;
        const Competence = Models.Competence;
        const Experience = Models.Experience;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        // Try to load the profile of the authenticated user first
        let profil = null;
        if (utilisateurId) {
          profil = await Profil.findOne({ utilisateur: utilisateurId }).lean();
        }

        // If no user profile, try to return a public/default profile (first found)
        if (!profil) {
          profil = await Profil.findOne({}).lean();
        }

        // If still no profile, return an empty but valid Profil object to respect GraphQL non-nullable contract
        const defaultProfil = {
          nom: '',
          prenom: '',
          metier: '',
          bio: '',
          photo: '',
          reseauxSociaux: [],
          localisation: '',
        };

        if (!profil) {
          return {
            profil: defaultProfil,
            projets: [],
            competences: [],
            experiences: [],
          };
        }

        // Determine ownerId deterministically
        const ownerId = profil.utilisateur ? profil.utilisateur : (utilisateurId || null);

        const [projets, competences, experiences] = await Promise.all([
          ownerId ? Projet.find({ utilisateur: ownerId }).populate('competences', 'nom').lean() : [],
          ownerId ? Competence.find({ utilisateur: ownerId }).populate('categorie', 'nom').lean() : [],
          ownerId ? Experience.find({ utilisateur: ownerId }).lean() : [],
        ]);

        const mappedProjets = (projets || []).map((p: any) => ({
          titre: p.titre || '',
          description: p.description || '',
          image: p.image || '',
          lienDemo: p.lienDemo || '',
          lienCode: p.lienCode || '',
          competences: Array.isArray(p.competences)
            ? p.competences.map((c: any) => ({ nom: c && c.nom ? c.nom : '' }))
            : [],
        }));

        const mappedCompetences = (competences || []).map((c: any) => ({
          nom: c.nom || '',
          niveau: typeof c.niveau === 'number' ? c.niveau : 0,
          categorie: c.categorie && c.categorie.nom ? { nom: c.categorie.nom } : null,
        }));

        const mappedExperiences = (experiences || []).map((e: any) => ({
          entreprise: e.entreprise || '',
          poste: e.poste || '',
          description: e.description || '',
          dateDebut: e.dateDebut ? new Date(e.dateDebut).toISOString() : null,
          dateFin: e.dateFin ? new Date(e.dateFin).toISOString() : null,
        }));

        // Ensure returned profil matches GraphQL Profil type (no-null fields)
        const returnedProfil = {
          nom: profil.nom || '',
          prenom: profil.prenom || '',
          metier: profil.metier || '',
          bio: profil.bio || '',
          photo: profil.photo || '',
          reseauxSociaux: profil.reseauxSociaux || [],
          localisation: profil.localisation || '',
        };

        return {
          profil: returnedProfil,
          projets: mappedProjets,
          competences: mappedCompetences,
          experiences: mappedExperiences,
        };
      } catch (err: any) {
        console.error('Erreur getPortfolio:', err?.message || err);
        throw new Error('Erreur interne lors de la récupération du portfolio');
      }
    },
  },
  Mutation: {
    login: async (_parent: any, args: any) => {
      try {
        const { username, password } = args;
        const Utilisateur = Models.Utilisateur;

        const user = await Utilisateur.findOne({ $or: [{ email: username }, { username: username }] });
        if (!user) {
          throw new Error('Email ou username invalide');
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
          throw new Error('Email ou mot de passe invalide');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
          token,
          user: { id: user._id.toString(), username: user.username, email: user.email },
        };
      } catch (err: any) {
        console.error('Erreur login resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la connexion');
      }
    },

    register: async (_parent: any, args: any) => {
      try {
        const { username, email, password, nom, prenom, metier } = args.input;
        const Utilisateur = Models.Utilisateur;
        const Profil = Models.Profil;

        const existing = await Utilisateur.findOne({ $or: [{ email }, { username }] });
        if (existing) {
          throw new Error('Utilisateur déjà existant avec cet email ou username');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Utilisateur.create({
          username,
          email,
          password: hashedPassword,
        });

        await Profil.create({
          utilisateur: newUser._id,
          nom,
          prenom,
          metier,
          bio: '',
          photo: '',
          reseauxSociaux: [],
          localisation: '',
        });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return {
          token,
          user: { id: newUser._id.toString(), username: newUser.username, email: newUser.email },
        };
      } catch (err: any) {
        console.error('Erreur register resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de l\'inscription');
      }
    },
  }
};
