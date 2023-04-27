import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IMovie, IMovieUpdateRequest } from "../../interfaces/movies.interface";
import { Movie } from "../../entities";
import { movieSchema } from "../../schemas/movie.schema";

const updateMoviesService = async (
  movieData: IMovieUpdateRequest,
  movieId: number
): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });
  await movieRepository.save(newMovieData);

  const returnMovie: IMovie = movieSchema.parse(newMovieData);
  return returnMovie;
};

export default updateMoviesService;
