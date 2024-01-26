import express from "express";
import debug from "debug";
import { initDbWithDummyData } from "./db";
import propertyRoutes from "./modules/properties/PropertyRoutes";
import cors, { CorsOptions } from "cors";

const appDebug = debug("lease-nxt:app");
appDebug("Creating an express application");
const app = express();

// Middleware
appDebug("Applying middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: CorsOptions = {
  credentials: true,
  allowedHeaders: ["content-type", "x-access-token", "baggage"],
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use("/api", propertyRoutes);

initDbWithDummyData();

export default app;
