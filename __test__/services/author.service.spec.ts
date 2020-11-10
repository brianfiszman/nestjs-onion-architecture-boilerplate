import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { AuthorService } from './../../src/domain/services/author.service';
import { AuthorRepository } from './../../src/infrastructure/repositories/author';
import { fakeAuthorCreateDTO } from '../../src/infrastructure/mocks/author.mock';

describe('Author Service', () => {
  let authorRepository: jest.Mocked<AuthorRepository>;
  let service: AuthorService;

  beforeEach(async () => {
    const authorRepositoryMock = {
      findAll: jest.fn(async () => ['author']),
      persist: jest.fn(async () => Promise.resolve()),
    };
    const entityManagerMock = {
      flush: jest.fn(),
      getRepository: jest.fn(() => authorRepositoryMock),
      transactional: jest.fn(async cb => {
        await cb(entityManagerMock);
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EntityManager,
          useValue: entityManagerMock,
        },
        {
          provide: AuthorRepository,
          useValue: authorRepositoryMock,
        },
        AuthorService,
      ],
    }).compile();

    authorRepository = module.get(AuthorRepository);
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
