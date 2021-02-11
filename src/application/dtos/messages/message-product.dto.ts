import { KafkaProducers } from '../../../domain/enums';
import { KafkaPayload, Product } from '../../../domain/interfaces';
import { MessageSendDto, MessageGetDTO } from './message-base.dto';

export class ProductMessageSendDto extends MessageSendDto {
  message: Product;
  constructor(message: Product) {
    super(KafkaProducers.ALKEMICS);
    this.message = message;
  }
}

export class ProductMessageGetDto extends MessageGetDTO {
  data: Product;
  constructor(data: KafkaPayload) {
    super(data);
    this.data = data.value.message as Product;
  }
}
