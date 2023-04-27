import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  moviesSchemaResponse,
} from "../schemas/movie.schema";
import { Movie } from "../entities";
import { DeepPartial } from "typeorm";

type IMovieRequest = z.infer<typeof movieSchemaRequest>;
type IMovie = z.infer<typeof movieSchema>;

type IMovieResponse = z.infer<typeof moviesSchemaResponse>;

type IMovieUpdateRequest = DeepPartial<IMovieRequest>;

interface IMovieListResponse {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Movie[];
}
export {
  IMovieRequest,
  IMovie,
  IMovieResponse,
  IMovieListResponse,
  IMovieUpdateRequest,
};
