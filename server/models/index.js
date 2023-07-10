import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

async function connect() {
  try {
      const databaseUri = process.env.DB_URI;
      await mongoose.set('strictQuery', false);
      await mongoose.connect(databaseUri).then(() => console.log("Connected to DB"));
  } catch (error) {
      console.log("Connection error: ", error);
  }
}

export default connect;