import express from "express";
import "express-async-errors";
import "reflect-metadata";

import { router } from "./routes";

import "./database";
import { ErrorController } from "./controllers/ErrorController";

const app = express();

app.use(express.json());

app.use(router);

app.use(ErrorController);

app.listen(3000, () =>
  console.log(`Server is running on http://localhost:3000`)
);
