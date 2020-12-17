import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './../../src/domain/services/author.service';
import { AuthorRepository } from './../../src/infrastructure/repositories';
import { fakeAuthorCreateDTO } from './../factories//author.factory';

describe('Author Service', () => {
  let service: AuthorService;

  beforeAll(async () => {
    const AuthorRepositoryMock = {
      findAll: jest.fn(async () => ['author']),
      persist: jest.fn(async () => Promise.resolve(fakeAuthorCreateDTO)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthorRepository,
          useValue: AuthorRepositoryMock,
        },
        AuthorService,
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Service test', () => {
    it('List all authors', async () => {
      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });

    it('Create a new author', async () => {
      const result = await service.create(fakeAuthorCreateDTO);

      expect(result).toMatchObject(fakeAuthorCreateDTO);
    });
  });
});
