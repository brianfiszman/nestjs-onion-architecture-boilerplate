import { KafkaProducers, KafkaSignals } from '../../../domain/enums';
import { KafkaPayload } from '../../../domain/interfaces';
import { MessageSendDto, MessageGetDTO } from './message-base.dto';

export class ActionMessageSendDto extends MessageSendDto {
  message: KafkaSignals;
  constructor(message: KafkaSignals) {
    super(KafkaProducers.SCHEDULER);
    this.message = message;
  }
}

export class ActionMessageGetDto extends MessageGetDTO {
  data: KafkaSignals;
  constructor(data: KafkaPayload) {
    super(data);
    this.data = data.value.message as KafkaSignals;
  }
}
