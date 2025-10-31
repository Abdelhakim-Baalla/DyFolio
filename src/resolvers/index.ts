const Models = require('../models');

export const resolvers = {
  Query: {
    getProfil: async (_parent: any, _args: any, context: any) => {
      try {
        const Profil = Models.Profil;

        const utilisateurId = context && context.utilisateur && (context.utilisateur.id || context.utilisateur._id || context.utilisateur.utilisateurId);

        let profil;
        if (utilisateurId) {
          profil = await Profil.findOne({ utilisateur: utilisateurId }).lean();
        }

        if (!profil) {
          return { Message: 'Profil non trouvé' };
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
      } catch (err) {
        console.error('Erreur getProfil:', err);
        return { nom: '', prenom: '', metier: '', bio: '' , photo: '', reseauxSociaux: [], localisation: ''};
      }
    },
  },
};
