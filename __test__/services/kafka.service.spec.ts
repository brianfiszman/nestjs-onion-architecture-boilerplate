import { SRServiceName } from './../../src/domain/enums/schemaRegistry.enums';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaServiceName } from '../../src/domain/enums';
import { KafkaService } from '../../src/domain/services';
import { any } from 'ramda';

describe('Kafka Service', () => {
  let service: KafkaService;

  beforeAll(async () => {
    const kafkaClientMock = {
      send: (data: any) => data,
    };

    const schemaServiceMock = {
      encodePayload: (data: any) => data,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: KafkaServiceName, useValue: kafkaClientMock },
        { provide: SRServiceName, useValue: schemaServiceMock },
        KafkaService,
        ConfigService,
      ],
    }).compile();

    service = module.get<KafkaService>(KafkaService);
  });

  describe('Service status', () => {
    it('Service should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
