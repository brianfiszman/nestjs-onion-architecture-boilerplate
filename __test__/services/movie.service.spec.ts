import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './../../src/domain/services/movie.service';
import { MovieRepository } from './../../src/infrastructure/repositories';
import { fakeMovieCreateDTO } from './../factories//movie.factory';

describe('Movie Service', () => {
  let service: MovieService;

  beforeAll(async () => {
    const MovieRepositoryMock = {
      findByTitle: jest.fn(() => []),
      findAll: jest.fn(async () => ['movie']),
      persist: jest.fn(async () => Promise.resolve(fakeMovieCreateDTO)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MovieRepository,
          useValue: MovieRepositoryMock,
        },
        MovieService,
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Service test', () => {
    it('List all movies', async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });

    it('Create a new movie', async () => {
      const result = await service.create(fakeMovieCreateDTO);

      expect(result).toMatchObject(fakeMovieCreateDTO);
    });
  });
});
