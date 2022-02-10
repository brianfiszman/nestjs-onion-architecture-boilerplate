import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MovieController } from '../../src/application/controllers';
import { MovieService } from '../../src/domain/services/movie.service';
import { fakeMovie, fakeMovieCreateDTO } from '../factories/movie.factory';
import { MovieRepository } from '../../src/infrastructure/repositories';

describe('Movie endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockRepository = {
      findByTitle: jest.fn(() => []),
      findAll: jest.fn(() => [fakeMovie]),
      persist: jest.fn(() => Promise.resolve(fakeMovieCreateDTO)),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: MovieRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('Check findAll method', () => {
    it('Should received status code 200', () => {
      return request(app.getHttpServer()).get('/movies').expect(200);
    });

    it('Should received an array of movies', async () => {
      const { body } = await request(app.getHttpServer()).get('/movies');

      expect(body).toHaveLength(1);
    });
  });

  describe('Check create method', () => {
    it('Should received status code 201', () => {
      console.error(fakeMovieCreateDTO);
      console.error(fakeMovieCreateDTO);
      return request(app.getHttpServer())
        .post('/movies')
        .send(fakeMovieCreateDTO)
        .set('Accept', 'application/json')
        .expect(201);
    });

    it('Should create new movie and received it in the response object', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/movies')
        .send(fakeMovieCreateDTO)
        .set('Accept', 'application/json');

      const { title, url } = fakeMovieCreateDTO;

      expect(body).toMatchObject({
        title,
        url,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
