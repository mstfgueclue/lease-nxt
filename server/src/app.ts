import express from "express";
import debug from "debug";
import { initDbWithDummyData } from "./db";
import propertyRoutes from "./modules/properties/PropertyRoutes";

const appDebug = debug("lease-nxt:app");
appDebug("Creating an express application");
const app = express();

// Middleware
appDebug("Applying middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", propertyRoutes);

initDbWithDummyData();

export default app;
