const Models = require('../models');

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
  },
};
