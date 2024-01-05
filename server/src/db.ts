import dotenv from "dotenv";
import debug from "debug";
import mongoose from "mongoose";

dotenv.config();
const dbDebug = debug("lease-nxt:db");

async function initDb() {
  const connectionString = process.env.ATLAS_URI || "";

  try {
    await mongoose.connect(connectionString);
    dbDebug("Connected to MongoDB");
  } catch (e) {
    dbDebug("Error connecting to MongoDB");
  }
}

export default initDb;
