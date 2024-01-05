import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function initDb() {
  const connectionString = process.env.ATLAS_URI || "";
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

export default initDb;
