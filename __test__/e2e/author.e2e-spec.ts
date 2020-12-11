import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthorController } from '../../src/application/controllers';
import { AuthorService } from '../../src/domain/services/author.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Author } from '../../src/domain/entities';
import { fakeAuthor, fakeAuthorCreateDTO } from '../factories/author.factory';
import request from 'supertest';

describe('Author endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockRepository = {
      findAll: () => [fakeAuthor],
      persist: () => Promise.resolve(fakeAuthorCreateDTO),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthorController],
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('Check findAll method', () => {
    it('Should received status code 200', () => {
      return request(app.getHttpServer()).get('/author').expect(200);
    });

    it('Should received an array of authors', async () => {
      const { body } = await request(app.getHttpServer()).get('/author');

      const [author] = body;
      const { name, email, born } = fakeAuthor;

      expect(author).toMatchObject({
        name,
        email,
        born: born.toISOString(),
      });
    });
  });

  describe('Check create method', () => {
    it('Should received status code 201', () => {
      return request(app.getHttpServer())
        .post('/author')
        .send(fakeAuthorCreateDTO)
        .set('Accept', 'application/json')
        .expect(201);
    });

    it('Should create new author and received it in the response object', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/author')
        .send(fakeAuthorCreateDTO)
        .set('Accept', 'application/json');

      const { name, email } = fakeAuthorCreateDTO;

      expect(body).toMatchObject({
        name,
        email,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
