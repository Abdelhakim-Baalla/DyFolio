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
  },
};
