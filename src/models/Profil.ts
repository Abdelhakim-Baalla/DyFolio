import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { UtilisateurInterface } from "./Utilisateur";

interface ProfilInterface extends Document {
  nom: string;
  prenom: string;
  bio?: string;
  photo?: string;
  reseauxSociaux?: string[];
  localisation?: string;
  metier: string;
  utilisateur: Types.ObjectId | PopulatedDoc<UtilisateurInterface>;
}

const ProfilSchema: Schema<ProfilInterface> = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    bio: { type: String, required: false },
    photo: { type: String, required: false },
    reseauxSociaux: { type: [String], required: false },
    localisation: { type: String, required: false },
    metier: { type: String, required: true },
    utilisateur: { type: Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  },
  { timestamps: true }
);

const ProfilModel = mongoose.model<ProfilInterface>("Profil", ProfilSchema);

export default ProfilModel;
