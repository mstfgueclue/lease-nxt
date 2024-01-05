import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import debug from "debug";

dotenv.config();
const dbDebug = debug("lease-nxt:db");

async function initDb() {
  const connectionString = process.env.ATLAS_URI || "";
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    dbDebug("Connected to MongoDB");
  } catch (e) {
    dbDebug("Error connecting to MongoDB");
  }
}

export default initDb;
