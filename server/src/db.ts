import dotenv from "dotenv";
import debug from "debug";
import fs from "fs";
import path from "path";
import PropertyModel from "./modules/properties/PropertySchema";
import mongoose from "mongoose";

dotenv.config();
const dbDebug = debug("lease-nxt:db");

async function initDb() {
  const connectionString = process.env.ATLAS_URI || "";

  try {
    await mongoose.connect(connectionString);
    dbDebug("Connected to MongoDB");
  } catch (error) {
    dbDebug(error);
  }
}

async function loadDummyData() {
  dbDebug("Loading dummy data");

  try {
    const count = await PropertyModel.countDocuments();
    if (count === 0) {
      const dataPath = path.join("./src/dummyData.json");
      const jsonContent = fs.readFileSync(dataPath, "utf8");
      const properties = JSON.parse(jsonContent);

      for (const property of properties) {
        await PropertyModel.create(property);
      }

      dbDebug("Finished loading dummy data");
    } else {
      dbDebug("Dummy data already loaded");
    }
  } catch (error) {
    dbDebug(error);
  }
}

export default initDb;
