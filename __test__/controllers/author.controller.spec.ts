import { validate } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { Author } from '../../src/domain/entities';
import { AuthorController } from './../../src/application/controllers/author.controller';
import { AuthorService } from '../../src/domain/services/author.service';
import { AuthorGetDTO } from '../../src/application/dtos/author';
import { fakeAuthor } from './../factories/author.factory';
import { KafkaService } from '../../src/domain/services';

describe('Author Controller', () => {
  let authorService: jest.Mocked<AuthorService>;
  let authorController: AuthorController;

  const authorServiceMock: Partial<AuthorService> = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const kafkaServiceMock: Partial<KafkaService> = {
    connectProducer: jest.fn(async () => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthorService,
          useValue: authorServiceMock,
        },
        {
          provide: KafkaService,
          useValue: kafkaServiceMock,
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
      const author: Author = new AuthorGetDTO(fakeAuthor);
      const authors: Author[] = [author];
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
      const author: Author = new AuthorGetDTO(fakeAuthor);
      authorService.create.mockResolvedValue(author);

      const result = await authorController.create(author);

      expect(result).toBeInstanceOf(AuthorGetDTO);
    });
  });
});
