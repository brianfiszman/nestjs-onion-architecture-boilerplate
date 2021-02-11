import { ProductMessageGetDto, ProductMessageSendDto } from '../../../src/application/dtos';
import { KafkaPayload } from './../../../src/domain/interfaces';
import { KafkaProducers } from '../../../src/domain/enums';
import { getFakeKafkaPayload, getFakeProduct } from '../../factories';

describe('Message Product Dtos', () => {
  describe('Product Get', () => {
    it('Should get a success passing valid properties', async () => {
      const payload = getFakeKafkaPayload(getFakeProduct());

      const dto = new ProductMessageGetDto(payload as KafkaPayload);

      expect(dto).toBeDefined();
    });
  });
  describe('Product Send', () => {
    it('Should get a success passing valid properties', async () => {
      const dto = new ProductMessageSendDto(getFakeProduct());

      expect(dto).toBeDefined();
    });
  });
});
