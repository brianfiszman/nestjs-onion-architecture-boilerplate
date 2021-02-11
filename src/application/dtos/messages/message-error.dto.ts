import { KafkaProducers } from '../../../domain/enums';
import { KafkaPayload, Errors } from '../../../domain/interfaces';
import { MessageSendDto, MessageGetDTO } from './message-base.dto';

export class ErrorMessageSendDto extends MessageSendDto {
  message: Errors;
  constructor(error: Error, location: string) {
    super(KafkaProducers.ALKEMICS);
    this.message = {
      date: new Date(),
      producer: KafkaProducers.ALKEMICS,
      message: error.message,
      error: error.stack,
      location,
    };
  }
}

export class ErrorMessageGetDto extends MessageGetDTO {
  data: Errors;
  constructor(data: KafkaPayload) {
    super(data);
    this.data = data.value.message as Errors;
  }
}
