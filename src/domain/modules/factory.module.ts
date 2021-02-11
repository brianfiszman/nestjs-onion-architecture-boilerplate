import { Module } from '@nestjs/common';
import { FactoryService } from '../services';

@Module({
  providers: [FactoryService],
  exports: [FactoryService],
})
export class FactoryModule {}
