import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaTopics } from '../../src/domain/enums';
import { SchemaRegistryService } from '../../src/domain/services';

describe('SchemaRegistry Service', () => {
  let service: SchemaRegistryService;

  const PRODUCTS_SCHEMA = process.env.PRODUCTS_SCHEMA;

  beforeAll(async () => {
    const configServiceMock = {
      get: jest.fn(() => ({ products: PRODUCTS_SCHEMA })),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        SchemaRegistryService,
      ],
    }).compile();

    service = module.get<SchemaRegistryService>(SchemaRegistryService);
  });

  describe('Service status', () => {
    it('Service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Schema id getter function', () => {
    it('Should get the correct schemaRegistry id from topic', () => {
      const topic = KafkaTopics.PRODUCTS;
      const schemaId = service.getSchemaIdByTopic(topic);

      expect(schemaId).toBe(PRODUCTS_SCHEMA);
    });
  });
});
