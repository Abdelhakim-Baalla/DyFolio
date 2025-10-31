import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { UtilisateurInterface } from "./Utilisateur";

export interface CategorieInterface extends Document {
  nom: string;
  description?: string;
  utilisateur: Types.ObjectId | PopulatedDoc<UtilisateurInterface>;
}

const CategorieSchema: Schema<CategorieInterface> = new Schema(
  {
    nom: { type: String, required: true },
    description: { type: String, required: false },
    utilisateur: { type: Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  },
  { timestamps: true }
);

const CategorieModel = mongoose.model<CategorieInterface>("Categorie", CategorieSchema);

export default CategorieModel;
