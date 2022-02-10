import { Injectable } from '@nestjs/common';
import { date, internet, lorem, name, random } from 'faker';
import { Categories, Entities } from '../enums';
import { MovieCreateDTO } from '../../application/dtos';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDocument } from '../entities';
import { Model } from 'mongoose';

@Injectable()
export class MovieSeederService {
  static MaxLengthDescription = 100;

  constructor(@InjectModel(Entities.Movie) private readonly movieModel: Model<MovieDocument>) {}

  async onModuleInit() {
    try {
      const movies: MovieCreateDTO[] = [...Array(100).keys()]
        .map(() => this.createFakeMovie())
        .map(({ categories, ...m }) => ({ ...m, categories: [...categories] }));

      await this.createMany(movies);
    } catch (e) {
      console.error(e);
    }
  }

  async createMany(movieCreateDTOs: MovieCreateDTO[]): Promise<void> {
    await this.movieModel.insertMany(movieCreateDTOs);
  }

  createFakeMovie = (): MovieCreateDTO => ({
    title: name.firstName(),
    url: internet.url(),
    description: lorem.word(MovieSeederService.MaxLengthDescription),
    categories: new Set(
      random.arrayElements([
        Categories.Action,
        Categories.Comedy,
        Categories.Drama,
        Categories.Mistery,
        Categories.Romance,
        Categories.Thriller,
      ])
    ),
    publishDate: date.past(),
  });
}
