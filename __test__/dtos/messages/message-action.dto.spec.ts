import { ActionMessageGetDto, ActionMessageSendDto } from '../../../src/application/dtos';
import { KafkaPayload } from './../../../src/domain/interfaces';
import { KafkaProducers, KafkaSignals } from '../../../src/domain/enums';
import { getFakeKafkaPayload } from '../../factories/kafka.factory';

describe('Message Action Dtos', () => {
  describe('Action Get', () => {
    it('Should get a success passing valid properties', async () => {
      const payload = getFakeKafkaPayload(KafkaSignals.START);

      const dto = new ActionMessageGetDto(payload as KafkaPayload);

      expect(dto).toBeDefined();
    });
  });
  describe('Action Send', () => {
    it('Should get a success passing valid properties', async () => {
      const dto = new ActionMessageSendDto(KafkaSignals.START);

      expect(dto).toBeDefined();
    });
  });
});
