import express from "express";
import debug from "debug";

const appDebug = debug("lease-nxt:app");
appDebug("Creating an express application");
const app = express();

// Middleware
appDebug("Applying middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDb();

export default app;
