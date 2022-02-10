import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { MovieCreateDTO, MovieGetDTO } from '../../application/dtos/movie';
import { MovieRepository } from '../../infrastructure/repositories';
import { Movie } from '../entities';

@Injectable()
export class MovieService {
  constructor(readonly movieRepository: MovieRepository) {}

  async findAll(): Promise<Movie[]> {
    const results: Movie[] = await this.movieRepository.findAll();
    return results;
  }

  async create(movieCreateDTO: MovieCreateDTO): Promise<Movie> {
    const errors = await validate(movieCreateDTO);

    if (errors.length) throw errors;

    const exists = await this.movieRepository.findByTitle({ title: movieCreateDTO.title });

    if (exists.length) throw 'Element already exists in database';

    const newMovie = await this.movieRepository.persist(movieCreateDTO);
    return newMovie;
  }

  async update(movieCreateDTO: MovieCreateDTO): Promise<Movie> {
    const errors = await validate(movieCreateDTO);

    if (errors.length) throw errors;

    const updatedMovie = await this.movieRepository.upsert(movieCreateDTO);
    const movieDTO: MovieGetDTO = new MovieGetDTO(updatedMovie);

    return movieDTO;
  }
}
