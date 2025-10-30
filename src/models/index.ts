const userMod = require('./Utilisateur');
const Utilisateur = userMod && userMod.default ? userMod.default : userMod;

module.exports = {
  Utilisateur,
};
