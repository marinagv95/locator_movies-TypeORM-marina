import { Router } from "express";
import {
  createMovieController,
  deleteMoviesController,
  listMoviesController,
  updateMoviesController,
} from "../controllers/movies.controller";
import ensureDataIsValideMiddleware from "../middleware/ensureDataIsValid.middleware";
import {
  movieSchemaRequest,
  movieSchemaUpdateRequest,
} from "../schemas/movie.schema";
import ensureMovieExistsMiddleware from "../middleware/ensureMovieExists.middleware";
import ensureIdExistsMiddleware from "../middleware/ensureIdExists.middleware";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  ensureMovieExistsMiddleware,
  ensureDataIsValideMiddleware(movieSchemaRequest),
  createMovieController
);
movieRoutes.get("", listMoviesController);

movieRoutes.patch(
  "/:id",
  ensureIdExistsMiddleware,
  ensureDataIsValideMiddleware(movieSchemaUpdateRequest),
  ensureMovieExistsMiddleware,
  updateMoviesController
);

movieRoutes.delete("/:id", deleteMoviesController);

export default movieRoutes;
