import { Repository } from "typeorm";
import { Movie } from "../../entities";
import {
  IMovieListResponse,
  IMovieResponse,
} from "../../interfaces/movies.interface";
import { AppDataSource } from "../../data-source";
import { moviesSchemaResponse } from "../../schemas/movie.schema";

const listMovieService = async (
  page: number | undefined,
  perPage: number | undefined,
  order: "asc" | "desc" | null | undefined = "asc",
  sort: "price" | "duration" | "id" | null | undefined = "id"
): Promise<IMovieListResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (typeof perPage !== "number" || perPage <= 0 || perPage > 5 || !perPage) {
    perPage = 5;
  }

  if (typeof page !== "number" || page <= 0 || !page) {
    page = 1;
  }

  const orderOption = order === "desc" ? "DESC" : "ASC";
  let sortColumn = "id";

  if (sort === "price") {
    sortColumn = "price";
  } else if (sort === "duration") {
    sortColumn = "duration";
  }

  const movies = await movieRepository.find({
    skip: (page - 1) * perPage,
    take: perPage,
    order: {
      [sortColumn]: orderOption,
    },
  });

  const count = await movieRepository.count();

  const dataMovies: IMovieResponse = moviesSchemaResponse.parse(movies);

  const returnMovies: IMovieListResponse = {
    prevPage:
      page > 1
        ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
        : null,
    nextPage:
      page * perPage < count
        ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
        : null,
    count,
    data: dataMovies,
  };
  return returnMovies;
};

export default listMovieService;
