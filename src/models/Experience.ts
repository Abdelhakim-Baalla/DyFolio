import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { UtilisateurInterface } from "./Utilisateur";

interface ExperienceInterface extends Document {
  poste: string;
  entreprise: string;
  description: string;
  dateDebut: Date;
  dateFin?: Date;
  utilisateur: Types.ObjectId | PopulatedDoc<UtilisateurInterface, Types.ObjectId>;
}

const ExperienceSchema: Schema = new Schema(
  {
    poste: { type: String, required: true },
    entreprise: { type: String, required: true },
    description: { type: String, required: false },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: false },
    utilisateur: { type: Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  },
  { timestamps: true }
);

const ExperienceModel = mongoose.model<ExperienceInterface>("Experience", ExperienceSchema);

export default ExperienceModel;
