import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { UtilisateurInterface } from "./Utilisateur";
import { CategorieInterface } from "./Categorie";

export interface CompetenceInterface extends Document {
  nom: string;
  niveau: number;
  categorie: Types.ObjectId | PopulatedDoc<CategorieInterface>;
  utilisateur: Types.ObjectId | PopulatedDoc<UtilisateurInterface>;
}

const CompetenceSchema: Schema<CompetenceInterface> = new Schema(
  {
    nom: { type: String, required: true },
    niveau: { type: Number, required: true },
    categorie: { type: Schema.Types.ObjectId, ref: "Categorie", required: true },
    utilisateur: { type: Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  },
  { timestamps: true }
);

const CompetenceModel = mongoose.model<CompetenceInterface>("Competence", CompetenceSchema);

export default CompetenceModel;
