import { validate } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../../src/domain/entities';
import { MovieController } from './../../src/application/controllers/movie.controller';
import { MovieService } from '../../src/domain/services/movie.service';
import { MovieCreateDTO, MovieGetDTO } from '../../src/application/dtos/movie';
import { fakeMovie } from '../factories';

describe('Movie Controller', () => {
  let movieService: jest.Mocked<MovieService>;
  let movieController: MovieController;

  const movieServiceMock: Partial<MovieService> = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MovieService,
          useValue: movieServiceMock,
        },
        MovieController,
      ],
    }).compile();

    movieService = module.get(MovieService);
    movieController = module.get<MovieController>(MovieController);
  });

  describe('Controller status', () => {
    it('Should be defined', () => {
      expect(movieController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('findAll should return valid DTOs', async () => {
      const movie: Movie = new MovieGetDTO(fakeMovie);
      const movies: Movie[] = [movie];
      movieService.findAll.mockResolvedValue(movies);
      const dtos = await movieController.findAll();

      dtos.map(async dto => {
        const errors = await validate(dto, {
          whitelist: true,
        });
        expect(errors).toHaveLength(1);
        expect(dto).toBeInstanceOf(MovieGetDTO);
      });
    });
  });

  describe('create', () => {
    it('New movie should be an DTO instance', async () => {
      const movie: Movie = new MovieGetDTO(fakeMovie);
      movieService.create.mockResolvedValue(movie);

      const result = await movieController.create(movie as MovieCreateDTO);

      expect(result).toBeInstanceOf(MovieGetDTO);
    });
  });
});
