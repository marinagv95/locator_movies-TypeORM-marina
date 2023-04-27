import "reflect-metadata";
import "express-async-error";
import express, { Application } from "express";
import { handleErrors } from "./error";
import movieRoutes from "./routes/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRoutes);

app.use(handleErrors);

export default app;
