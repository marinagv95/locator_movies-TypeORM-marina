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

  let orderOption = order === "desc" ? "DESC" : "ASC";

  if (sort === "price") {
    sort = "price";
  } else if (sort === "duration") {
    sort = "duration";
  } else {
    (sort = "id"), (orderOption = "ASC");
  }

  const movies = await movieRepository.find({
    skip: (page - 1) * perPage,
    take: perPage,
    order: {
      [sort]: orderOption,
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
