import { ArgumentsHost, Catch, Logger, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { KafkaTopics } from '../../domain/enums';
import { KafkaService } from '../../domain/services';
import { ErrorMessageSendDto } from '../dtos';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private kafkaService: KafkaService) {}
  private readonly logger = new Logger(GlobalExceptionsFilter.name);
  catch(exception: RpcException | any, host: ArgumentsHost): any {
    this.logger.error(exception.message || exception, exception.stack, GlobalExceptionsFilter.name);
    this.kafkaService.sendMessage(KafkaTopics.ERRORS, new ErrorMessageSendDto(exception, GlobalExceptionsFilter.name));
  }
}
