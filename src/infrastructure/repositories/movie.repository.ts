import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../../domain/entities';
import { MovieCreateDTO } from '../../application/dtos/movie/movie-create.dto';
import { Entities } from '../../domain/enums/entities.enum';

@Injectable()
export class MovieRepository {
  constructor(@InjectModel(Entities.Movie) private readonly movieModel: Model<MovieDocument>) {}

  async findByTitle({ title }: any): Promise<Movie[]> {
    const results: Movie[] = await this.movieModel.find({ title }).exec();
    return results;
  }

  async findAll(): Promise<Movie[]> {
    const results: Movie[] = await this.movieModel.find().exec();
    return results;
  }

  async persist(movieCreateDTO: MovieCreateDTO): Promise<Movie> {
    const newMovie = new this.movieModel(movieCreateDTO);
    return await newMovie.save();
  }

  async upsert(movieCreateDTO: MovieCreateDTO): Promise<MovieDocument | null> {
    return await this.movieModel.findOneAndUpdate({ title: movieCreateDTO.title }, movieCreateDTO);
  }
}
