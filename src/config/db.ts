import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  mongoose
  .connect(mongoUri as string)
  .then(() => console.log("La base de données MongoDB est connectée"))
  .catch((err) => console.error("Erreur lors de la connexion à MongoDB:", err));
};

export default connectDB;
