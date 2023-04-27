import { Request, Response } from "express";
import createMovieService from "../services/movies/createMovies.services";
import listMovieService from "../services/movies/listMovies.service";
import {
  IMovie,
  IMovieRequest,
  IMovieUpdateRequest,
} from "../interfaces/movies.interface";
import updateMoviesService from "../services/movies/updateMovies.services";
import deleteMovieService from "../services/movies/deleteMovies.services";

const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: IMovieRequest = req.body;
  const newMovie = await createMovieService(movieData);
  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number | undefined = Number(req.query.page);
  const perPage: number | undefined = Number(req.query.perPage);
  const order: any = req.query.order;
  const sort: any = req.query.sort;
  const movies = await listMovieService(page, perPage, order, sort);
  return res.json(movies);
};

const updateMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: IMovieUpdateRequest = req.body;
  const movieId: number = parseInt(req.params.id);
  const newMovieData: IMovie = await updateMoviesService(movieData, movieId);
  return res.json(newMovieData);
};

const deleteMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);
  await deleteMovieService(movieId);
  return res.status(204).json();
};

export {
  createMovieController,
  listMoviesController,
  updateMoviesController,
  deleteMoviesController,
};
