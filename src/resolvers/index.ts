const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Import des validateurs
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
          id: p._id.toString(),
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
    getProjet: async (_parent: any, args: any, context: any) => {
      try {
        const Projet = Models.Projet;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const projet = await Projet.findOne({ _id: id, utilisateur: utilisateurId }).populate('competences', 'nom').lean();

        if (!projet) {
          throw new Error('Projet non trouvé');
        }

        return {
          id: projet._id.toString(),
          titre: projet.titre || '',
          description: projet.description || '',
          image: projet.image || '',
          lienDemo: projet.lienDemo || '',
          lienCode: projet.lienCode || '',
          competences: Array.isArray(projet.competences)
            ? projet.competences.map((c: any) => ({ nom: c && c.nom ? c.nom : '' }))
            : [],
        };
      } catch (err: any) {
        console.error('Erreur getProjet:', err?.message || err);
        if (err instanceof Error && (err.message === 'Utilisateur non authentifié' || err.message === 'Projet non trouvé')) {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération du projet');
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
          id: c._id.toString(),
          nom: c.nom || '',
          niveau: typeof c.niveau === 'number' ? c.niveau : 0,
          categorie: c.categorie && c.categorie.nom ? { id: c.categorie._id.toString(), nom: c.categorie.nom } : null,
        }));
      } catch (err: any) {
        console.error('Erreur getCompetences:', err?.message || err);
        if (err instanceof Error && err.message === 'Utilisateur non authentifié') {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération des compétences');
      }
    },
    getCompetence: async (_parent: any, args: any, context: any) => {
      try {
        const Competence = Models.Competence;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const competence = await Competence.findOne({ _id: id, utilisateur: utilisateurId }).populate('categorie', 'nom').lean();

        if (!competence) {
          throw new Error('Compétence non trouvée');
        }

        return {
          id: competence._id.toString(),
          nom: competence.nom || '',
          niveau: typeof competence.niveau === 'number' ? competence.niveau : 0,
          categorie: competence.categorie && competence.categorie.nom ? { id: competence.categorie._id.toString(), nom: competence.categorie.nom } : null,
        };
      } catch (err: any) {
        console.error('Erreur getCompetence:', err?.message || err);
        if (err instanceof Error && (err.message === 'Utilisateur non authentifié' || err.message === 'Compétence non trouvée')) {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération de la compétence');
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
          id: e._id.toString(),
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
    getExperience: async (_parent: any, args: any, context: any) => {
      try {
        const Experience = Models.Experience;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const experience = await Experience.findOne({ _id: id, utilisateur: utilisateurId }).lean();

        if (!experience) {
          throw new Error('Expérience non trouvée');
        }

        return {
          id: experience._id.toString(),
          poste: experience.poste || '',
          entreprise: experience.entreprise || '',
          description: experience.description || '',
          dateDebut: experience.dateDebut ? new Date(experience.dateDebut).toISOString() : null,
          dateFin: experience.dateFin ? new Date(experience.dateFin).toISOString() : null,
        };
      } catch (err: any) {
        console.error('Erreur getExperience:', err?.message || err);
        if (err instanceof Error && (err.message === 'Utilisateur non authentifié' || err.message === 'Expérience non trouvée')) {
          throw err;
        }
        throw new Error('Erreur interne lors de la récupération de l\'expérience');
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

        let profil = null;
        if (utilisateurId) {
          profil = await Profil.findOne({ utilisateur: utilisateurId }).lean();
        }

        if (!profil) {
          profil = await Profil.findOne({}).lean();
        }

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
          id: p._id.toString(),
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
          id: c._id.toString(),
          nom: c.nom || '',
          niveau: typeof c.niveau === 'number' ? c.niveau : 0,
          categorie: c.categorie && c.categorie.nom ? { id: c.categorie._id.toString(), nom: c.categorie.nom } : null,
        }));

        const mappedExperiences = (experiences || []).map((e: any) => ({
          id: e._id.toString(),
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

    updateProfil: async (_parent: any, args: any, context: any) => {
      try {
        const Profil = Models.Profil;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        const updatedProfil = await Profil.findOneAndUpdate(
          { utilisateur: utilisateurId },
          { ...args.input },
          { new: true }
        );

        if (!updatedProfil) {
          throw new Error('Profil non trouvé');
        }

        return updatedProfil;
      } catch (err: any) {
        console.error('Erreur updateProfil resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la mise à jour du profil');
      }
    },

    createProjet: async (_parent: any, args: any, context: any) => {
      try {
        const Projet = Models.Projet;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation des données d'entrée
        const { error, value } = createProjetSchema.validate(args.input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const { titre, description, image, lienDemo, lienCode, competences } = value;

        const newProjet = await Projet.create({
          titre,
          description: description || '',
          image: image || '',
          lienDemo: lienDemo || '',
          lienCode: lienCode || '',
          competences: competences || [],
          utilisateur: utilisateurId,
        });

        const populatedProjet = await Projet.findById(newProjet._id).populate('competences', 'nom').lean();

        return {
          id: populatedProjet._id.toString(),
          titre: populatedProjet.titre || '',
          description: populatedProjet.description || '',
          image: populatedProjet.image || '',
          lienDemo: populatedProjet.lienDemo || '',
          lienCode: populatedProjet.lienCode || '',
          competences: Array.isArray(populatedProjet.competences)
            ? populatedProjet.competences.map((c: any) => ({ nom: c && c.nom ? c.nom : '' }))
            : [],
        };
      } catch (err: any) {
        console.error('Erreur createProjet resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la création du projet');
      }
    },

    updateProjet: async (_parent: any, args: any, context: any) => {
      try {
        const Projet = Models.Projet;
        const { id, input } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = projetIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        // Validation des données d'entrée
        const { error, value } = updateProjetSchema.validate(input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const existingProjet = await Projet.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingProjet) {
          throw new Error('Projet non trouvé ou vous n\'avez pas les permissions');
        }

        const updatedProjet = await Projet.findByIdAndUpdate(
          id,
          { ...value },
          { new: true }
        ).populate('competences', 'nom').lean();

        if (!updatedProjet) {
          throw new Error('Erreur lors de la mise à jour du projet');
        }

        return {
          id: updatedProjet._id.toString(),
          titre: updatedProjet.titre || '',
          description: updatedProjet.description || '',
          image: updatedProjet.image || '',
          lienDemo: updatedProjet.lienDemo || '',
          lienCode: updatedProjet.lienCode || '',
          competences: Array.isArray(updatedProjet.competences)
            ? updatedProjet.competences.map((c: any) => ({ nom: c && c.nom ? c.nom : '' }))
            : [],
        };
      } catch (err: any) {
        console.error('Erreur updateProjet resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la mise à jour du projet');
      }
    },

    deleteProjet: async (_parent: any, args: any, context: any) => {
      try {
        const Projet = Models.Projet;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = projetIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        const existingProjet = await Projet.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingProjet) {
          throw new Error('Projet non trouvé ou vous n\'avez pas les permissions');
        }

        await Projet.findByIdAndDelete(id);

        return true;
      } catch (err: any) {
        console.error('Erreur deleteProjet resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la suppression du projet');
      }
    },

    createCompetence: async (_parent: any, args: any, context: any) => {
      try {
        const Competence = Models.Competence;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation des données d'entrée
        const { error, value } = createCompetenceSchema.validate(args.input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const { nom, niveau, categorie, description, icone } = value;

        const newCompetence = await Competence.create({
          nom,
          niveau,
          categorie,
          description: description || '',
          icone: icone || '',
          utilisateur: utilisateurId,
        });

        const populatedCompetence = await Competence.findById(newCompetence._id).populate('categorie', 'nom').lean();

        return {
          id: populatedCompetence._id.toString(),
          nom: populatedCompetence.nom || '',
          niveau: typeof populatedCompetence.niveau === 'number' ? populatedCompetence.niveau : 0,
          categorie: populatedCompetence.categorie && populatedCompetence.categorie.nom ? { id: populatedCompetence.categorie._id.toString(), nom: populatedCompetence.categorie.nom } : null,
        };
      } catch (err: any) {
        console.error('Erreur createCompetence resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la création de la compétence');
      }
    },

    updateCompetence: async (_parent: any, args: any, context: any) => {
      try {
        const Competence = Models.Competence;
        const { id, input } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = competenceIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        // Validation des données d'entrée
        const { error, value } = updateCompetenceSchema.validate(input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const existingCompetence = await Competence.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingCompetence) {
          throw new Error('Compétence non trouvée ou vous n\'avez pas les permissions');
        }

        const updatedCompetence = await Competence.findByIdAndUpdate(
          id,
          { ...value },
          { new: true }
        ).populate('categorie', 'nom').lean();

        if (!updatedCompetence) {
          throw new Error('Erreur lors de la mise à jour de la compétence');
        }

        return {
          id: updatedCompetence._id.toString(),
          nom: updatedCompetence.nom || '',
          niveau: typeof updatedCompetence.niveau === 'number' ? updatedCompetence.niveau : 0,
          categorie: updatedCompetence.categorie && updatedCompetence.categorie.nom ? { id: updatedCompetence.categorie._id.toString(), nom: updatedCompetence.categorie.nom } : null,
        };
      } catch (err: any) {
        console.error('Erreur updateCompetence resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la mise à jour de la compétence');
      }
    },

    deleteCompetence: async (_parent: any, args: any, context: any) => {
      try {
        const Competence = Models.Competence;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = competenceIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        const existingCompetence = await Competence.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingCompetence) {
          throw new Error('Compétence non trouvée ou vous n\'avez pas les permissions');
        }

        await Competence.findByIdAndDelete(id);

        return true;
      } catch (err: any) {
        console.error('Erreur deleteCompetence resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la suppression de la compétence');
      }
    },

    createExperience: async (_parent: any, args: any, context: any) => {
      try {
        const Experience = Models.Experience;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation des données d'entrée
        const { error, value } = createExperienceSchema.validate(args.input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const { poste, entreprise, description, dateDebut, dateFin, lieu, type, competences } = value;

        const newExperience = await Experience.create({
          poste,
          entreprise,
          description: description || '',
          dateDebut: dateDebut ? new Date(dateDebut) : new Date(),
          dateFin: dateFin ? new Date(dateFin) : null,
          lieu: lieu || '',
          type: type || '',
          competences: competences || [],
          utilisateur: utilisateurId,
        });

        return {
          id: newExperience._id.toString(),
          poste: newExperience.poste || '',
          entreprise: newExperience.entreprise || '',
          description: newExperience.description || '',
          dateDebut: newExperience.dateDebut ? new Date(newExperience.dateDebut).toISOString() : null,
          dateFin: newExperience.dateFin ? new Date(newExperience.dateFin).toISOString() : null,
        };
      } catch (err: any) {
        console.error('Erreur createExperience resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la création de l\'expérience');
      }
    },

    updateExperience: async (_parent: any, args: any, context: any) => {
      try {
        const Experience = Models.Experience;
        const { id, input } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = experienceIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        // Validation des données d'entrée
        const { error, value } = updateExperienceSchema.validate(input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map(detail => detail.message).join(', ');
          throw new Error(`Erreur de validation: ${errorMessages}`);
        }

        const existingExperience = await Experience.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingExperience) {
          throw new Error('Expérience non trouvée ou vous n\'avez pas les permissions');
        }

        const updateData: any = {};
        if (value.poste !== undefined) updateData.poste = value.poste;
        if (value.entreprise !== undefined) updateData.entreprise = value.entreprise;
        if (value.description !== undefined) updateData.description = value.description;
        if (value.dateDebut !== undefined) updateData.dateDebut = new Date(value.dateDebut);
        if (value.dateFin !== undefined) updateData.dateFin = value.dateFin ? new Date(value.dateFin) : null;
        if (value.lieu !== undefined) updateData.lieu = value.lieu;
        if (value.type !== undefined) updateData.type = value.type;
        if (value.competences !== undefined) updateData.competences = value.competences;

        const updatedExperience = await Experience.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).lean();

        if (!updatedExperience) {
          throw new Error('Erreur lors de la mise à jour de l\'expérience');
        }

        return {
          id: updatedExperience._id.toString(),
          poste: updatedExperience.poste || '',
          entreprise: updatedExperience.entreprise || '',
          description: updatedExperience.description || '',
          dateDebut: updatedExperience.dateDebut ? new Date(updatedExperience.dateDebut).toISOString() : null,
          dateFin: updatedExperience.dateFin ? new Date(updatedExperience.dateFin).toISOString() : null,
        };
      } catch (err: any) {
        console.error('Erreur updateExperience resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la mise à jour de l\'expérience');
      }
    },

    deleteExperience: async (_parent: any, args: any, context: any) => {
      try {
        const Experience = Models.Experience;
        const { id } = args;

        const payload = (context && (context.user || context.utilisateur)) || null;
        const utilisateurId = payload && (payload.id || payload._id || payload.userId || payload.utilisateurId);

        if (!utilisateurId) {
          throw new Error('Utilisateur non authentifié');
        }

        // Validation de l'ID
        const { error: idError } = experienceIdSchema.validate(id);
        if (idError) {
          throw new Error(`Erreur de validation: ${idError.message}`);
        }

        const existingExperience = await Experience.findOne({ _id: id, utilisateur: utilisateurId });
        if (!existingExperience) {
          throw new Error('Expérience non trouvée ou vous n\'avez pas les permissions');
        }

        await Experience.findByIdAndDelete(id);

        return true;
      } catch (err: any) {
        console.error('Erreur deleteExperience resolver:', err?.message || err);
        throw new Error(err.message || 'Erreur lors de la suppression de l\'expérience');
      }
    },
  },
};
