import express from "express";
import debug from "debug";
import { initDbWithDummyData } from "./db";

const appDebug = debug("lease-nxt:app");
appDebug("Creating an express application");
const app = express();

// Middleware
appDebug("Applying middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDbWithDummyData();

export default app;
