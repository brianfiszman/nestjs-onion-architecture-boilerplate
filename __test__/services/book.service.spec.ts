import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './../../src/domain/services/book.service';
import { BookRepository } from './../../src/infrastructure/repositories';
import { fakeBookCreateDTO } from './../factories/book.factory';

describe('Book Service', () => {
  let service: BookService;

  beforeEach(async () => {
    const bookRepositoryMock = {
      findAll: jest.fn(async () => ['book']),
      persist: jest.fn(async () => Promise.resolve(fakeBookCreateDTO)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookRepository,
          useValue: bookRepositoryMock,
        },
        BookService,
      ],
    }).compile();

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
