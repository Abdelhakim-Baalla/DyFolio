const userMod = require('./Utilisateur');
const profilMod = require('./Profil');
const experienceMod = require('./Experience');
const categorieMod = require('./Categorie');
const competenceMod = require('./Competence');

const Utilisateur = userMod && userMod.default ? userMod.default : userMod;
const Profil = profilMod && profilMod.default ? profilMod.default : profilMod;
const Experience = experienceMod && experienceMod.default ? experienceMod.default : experienceMod;
const Categorie = categorieMod && categorieMod.default ? categorieMod.default : categorieMod;
const Competence = competenceMod && competenceMod.default ? competenceMod.default : competenceMod;

module.exports = {
  Utilisateur,
  Profil,
  Experience,
  Categorie,
  Competence,
};
