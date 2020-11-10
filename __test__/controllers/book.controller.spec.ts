import { fakeAuthor } from './../../src/infrastructure/mocks/author.mock';
import { fakeBook } from './../../src/infrastructure/mocks/book.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './../../src/application/controllers/book.controller';
import { BookService } from './../../src/domain/services/book.service';
import { Author, Book } from '../../src/domain/entities';
import { BookGetDTO } from '../../src/application/dtos/book/book-get.dto';
import { validate } from 'class-validator';

describe('Book Controller', () => {
  let bookService: jest.Mocked<BookService>;
  let bookController: BookController;

  beforeEach(async () => {
    const bookServiceMock: Partial<BookService> = {
      findAll: jest.fn(),
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
        BookController,
      ],
    }).compile();

    bookService = module.get(BookService);
    bookController = module.get<BookController>(BookController);
  });

  describe('Controller status', () => {
    it('Should be defined', () => {
      expect(bookController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('findAll should return valid DTOs', async () => {
      const { title } = fakeBook;
      const { name, email } = fakeAuthor;
      const author = new Author(name, email);
      const books: Book[] = [new Book(title, author)];
      bookService.findAll.mockResolvedValue(books);
      const dtos = await bookController.findAll();

      dtos.map(async dto => {
        const errors = await validate(dto, { whitelist: true });
        expect(errors).toHaveLength(0);
        expect(dto).toBeInstanceOf(BookGetDTO);
      });
    });
  });

  describe('create', () => {
    it('New book should be and DTO instance', async () => {
      const { title } = fakeBook;
      const { name, email } = fakeAuthor;
      const author = new Author(name, email);
      const book: Book = new Book(title, author);
      bookService.create.mockResolvedValue(book);

      const result = await bookController.create(book);

      expect(result).toBeInstanceOf(BookGetDTO);
    });
  });
});
