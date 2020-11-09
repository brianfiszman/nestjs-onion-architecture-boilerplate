import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppController } from '../../src/application/controllers';

describe('App endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello, world!');
  });

  afterAll(async () => {
    await app.close();
  });
});
