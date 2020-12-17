import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { fakeAuthor } from './../factories/author.factory';
import { fakeBook } from './../factories/book.factory';
import { BookController } from './../../src/application/controllers/book.controller';
import { BookService } from './../../src/domain/services/book.service';
import { Book } from '../../src/domain/entities';
import { BookGetDTO } from '../../src/application/dtos/book/book-get.dto';
import { BookCreateDTO } from '../../src/application/dtos/book';

describe('Book Controller', () => {
  let bookService: jest.Mocked<BookService>;
  let bookController: BookController;

  const bookServiceMock: Partial<BookService> = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
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
      const { title, _id } = fakeBook;
      const book: any = new BookCreateDTO({ title, author: fakeAuthor });
      book._id = _id;
      const books: Book[] = [book];
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
      const { title, _id } = fakeBook;
      const author = fakeAuthor;
      const book: any = new BookCreateDTO({ title, author });
      book._id = _id;
      bookService.create.mockResolvedValue(book);

      const result = await bookController.create(book);

      expect(result).toBeInstanceOf(BookGetDTO);
    });
  });
});
