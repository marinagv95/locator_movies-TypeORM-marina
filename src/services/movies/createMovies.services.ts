import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { IMovieRequest } from "../../interfaces/movies.interface";
import { AppDataSource } from "../../data-source";

const createMovieService = async (movieData: IMovieRequest): Promise<Movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  return movie;
};

export default createMovieService;
