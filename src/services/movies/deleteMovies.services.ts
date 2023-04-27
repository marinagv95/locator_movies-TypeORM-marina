import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IMovie, IMovieUpdateRequest } from "../../interfaces/movies.interface";
import { Movie } from "../../entities";
import { AppError } from "../../error";

const deleteMovieService = async (movieId: number): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return await movieRepository.remove(movie);
};

export default deleteMovieService;
