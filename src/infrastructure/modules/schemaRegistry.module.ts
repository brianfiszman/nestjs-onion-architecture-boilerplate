import { Module, Global } from '@nestjs/common';
import { SchemaRegistryService } from '../../domain/services';

@Global()
@Module({
  providers: [SchemaRegistryService],
  exports: [SchemaRegistryService],
})
export class SchemaRegistryModule {}
