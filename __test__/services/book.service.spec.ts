import { fakeBookCreateDTO } from './../../src/infrastructure/mocks/book.mock';
import { EntityManager } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './../../src/domain/services/book.service';
import { BookRepository } from './../../src/infrastructure/repositories';

describe('Book Service', () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let service: BookService;

  beforeEach(async () => {
    const bookRepositoryMock = {
      findAll: jest.fn(async () => ['book']),
      persist: jest.fn(async () => Promise.resolve()),
    };
    const entityManagerMock = {
      flush: jest.fn(),
      getRepository: jest.fn(() => bookRepositoryMock),
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
          provide: BookRepository,
          useValue: bookRepositoryMock,
        },
        BookService,
      ],
    }).compile();

    bookRepository = module.get(BookRepository);
    service = module.get<BookService>(BookService);
  });

  describe('Service status', () => {
    it('Should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Service test', () => {
    it('List all books', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('Create a new book', async () => {
      const result = await service.create(fakeBookCreateDTO);

      expect(result).toMatchObject(fakeBookCreateDTO);
    });
  });
});
