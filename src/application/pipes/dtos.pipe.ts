import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { KafkaPayload } from '../../domain/interfaces';
import { MessageGetDTO } from '../dtos';

@Injectable()
export class ConvertToDtoPipe implements PipeTransform {
  transform(value: KafkaPayload, metadata: ArgumentMetadata): MessageGetDTO {
    return new MessageGetDTO(value);
  }
}
