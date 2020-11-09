import { AuthorController } from './../../src/application/controllers/author.controller';
import { AuthorService } from '../../src/domain/services/author';
import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '../../src/domain/entities';
import { plainToClass } from 'class-transformer';
import { AuthorGetDTO } from '../../src/application/dtos/author';
import { validate } from 'class-validator';

describe('Author Controller', () => {
  let authorService: jest.Mocked<AuthorService>;
  let authorController: AuthorController;

  beforeEach(async () => {
    const authorServiceMock: Partial<AuthorService> = {
      findAll: jest.fn(),
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

  describe('find authors', () => {
    it('findAll should create a DTO with missing values and catch errors', async () => {
      const authors: Author[] = [new Author('alejandro', 'test@test.com')];
      authorService.findAll.mockResolvedValue(authors);
      const dtos = (await authorController.findAll()).map(pojo => plainToClass(AuthorGetDTO, pojo));
      dtos.map(async dto => {
        const errors = await validate(dto, {
          whitelist: true,
        });
        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });
});
