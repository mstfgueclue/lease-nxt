import express from "express";
import initDb from "./db";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDb();

export default app;
