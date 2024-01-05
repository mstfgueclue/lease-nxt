import express from "express";
import debug from "debug";

const appDebug = debug("lease-nxt:app");
appDebug("Starting application");
const app = express();

appDebug("Applying middlewares");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDb();

export default app;
