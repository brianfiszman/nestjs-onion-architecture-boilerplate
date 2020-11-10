import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Author } from '../../src/domain/entities';
import { AuthorController } from './../../src/application/controllers/author.controller';
import { AuthorService } from '../../src/domain/services/author.service';
import { AuthorGetDTO } from '../../src/application/dtos/author';
import { fakeAuthor } from './../../src/infrastructure/mocks/author.mock';

describe('Author Controller', () => {
  let authorService: jest.Mocked<AuthorService>;
  let authorController: AuthorController;

  beforeEach(async () => {
    const authorServiceMock: Partial<AuthorService> = {
      findAll: jest.fn(),
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthorService,
          useValue: authorServiceMock,
        },
        AuthorController,
      ],
    }).compile();

    authorService = module.get(AuthorService);
    authorController = module.get<AuthorController>(AuthorController);
  });

  describe('Controller status', () => {
    it('Should be defined', () => {
      expect(authorController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('findAll should return valid DTOs', async () => {
      const { name, email } = fakeAuthor;
      const authors: Author[] = [new Author(name, email)];
      authorService.findAll.mockResolvedValue(authors);
      const dtos = await authorController.findAll();

      dtos.map(async dto => {
        const errors = await validate(dto, {
          whitelist: true,
        });
        expect(errors).toHaveLength(0);
        expect(dto).toBeInstanceOf(AuthorGetDTO);
      });
    });
  });

  describe('create', () => {
    it('New author should be an DTO instance', async () => {
      const { name, email } = fakeAuthor;
      const author: Author = new Author(name, email);
      authorService.create.mockResolvedValue(author);

      const result = await authorController.create(author);

      expect(result).toBeInstanceOf(AuthorGetDTO);
    });
  });
});
