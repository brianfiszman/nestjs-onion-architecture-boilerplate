import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthorController } from '../../src/application/controllers';
import { AuthorService } from '../../src/domain/services/author.service';
import { fakeAuthor, fakeAuthorCreateDTO } from '../factories/author.factory';
import { AuthorRepository } from '../../src/infrastructure/repositories';
import { KafkaService } from '../../src/domain/services';

describe('Author endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockRepository = {
      findAll: jest.fn(() => [fakeAuthor]),
      persist: jest.fn(() => Promise.resolve(fakeAuthorCreateDTO)),
    };

    const kafkaServiceMock: Partial<KafkaService> = {
      connectProducer: jest.fn(async () => {}),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthorController],
      providers: [
        AuthorService,
        {
          provide: AuthorRepository,
          useValue: mockRepository,
        },
        {
          provide: KafkaService,
          useValue: kafkaServiceMock,
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
      const { _id, name, email } = fakeAuthor;

      expect(author).toMatchObject({
        _id,
        name,
        email,
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
