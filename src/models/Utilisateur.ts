import mongoose, {Schema, Document} from "mongoose";
import Role from "./Enums/roles";

interface UtilisateurInterface extends Document {
   username: string;
   email: string;
   password: string;
   role: Role.ADMIN | Role.PROPRIETAIRE;
}

const UtilisateurSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [Role.ADMIN, Role.PROPRIETAIRE], default: Role.PROPRIETAIRE },
  },
  { timestamps: true }
);

const UtilisateurModel = mongoose.model<UtilisateurInterface>("Utilisateur", UtilisateurSchema);

export default UtilisateurModel;
