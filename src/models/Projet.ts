import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { UtilisateurInterface } from "./Utilisateur";
import { CompetenceInterface } from "./Competence";

export interface ProjetInterface extends Document {
  titre: string;
  description?: string;
  image?: string;
  lienDemo?: string;
  lienCode?: string;
  competences: Types.ObjectId[] | PopulatedDoc<CompetenceInterface>[];
  utilisateur: Types.ObjectId | PopulatedDoc<UtilisateurInterface>;
}

const ProjetSchema: Schema<ProjetInterface> = new Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    lienDemo: { type: String, required: false },
    lienCode: { type: String, required: false },
    competences: [{ type: Schema.Types.ObjectId, ref: "Competence", required: false }],
    utilisateur: { type: Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  },
  { timestamps: true }
);

const ProjetModel = mongoose.model<ProjetInterface>("Projet", ProjetSchema);

export default ProjetModel;
