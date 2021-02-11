import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, Logger } from '@nestjs/common';
import { RpcArgumentsHost } from '@nestjs/common/interfaces';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { SchemaRegistryService } from '../../domain/services';
import { SRServiceName } from '../../domain/enums';
import { KafkaPayload } from '../../domain/interfaces';
import { convertUnixToDate } from '../../domain/helpers';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(@Inject(SRServiceName) private readonly registry: SchemaRegistryService) {}
  private readonly logger = new Logger(SerializerInterceptor.name);
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    try {
      this.registry.initSchemaRegisterClient();

      const host: RpcArgumentsHost = context.switchToRpc();
      const data: KafkaPayload = host.getData();

      data.timestamp = convertUnixToDate(data.timestamp);

      const buffer = Buffer.from(data.value);
      data.value = await this.registry.decodePayload(buffer);
    } catch (err) {
      throw new RpcException(err);
    }

    return next.handle().pipe(value => {
      this.logger.debug('After handle request...');
      return value;
    });
  }
}
