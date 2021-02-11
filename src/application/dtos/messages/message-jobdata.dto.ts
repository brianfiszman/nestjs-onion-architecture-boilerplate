import { KafkaProducers } from '../../../domain/enums';
import { KafkaPayload, Jobdata } from '../../../domain/interfaces';
import { MessageSendDto, MessageGetDTO } from './message-base.dto';

export class JobdataMessageSendDto extends MessageSendDto {
  message: Jobdata;
  constructor(message: Jobdata) {
    super(KafkaProducers.ALKEMICS);
    this.message = message;
  }
}

export class JobdataMessageGetDto extends MessageGetDTO {
  data: Jobdata;
  constructor(data: KafkaPayload) {
    super(data);
    this.data = data.value.message as Jobdata;
  }
}
