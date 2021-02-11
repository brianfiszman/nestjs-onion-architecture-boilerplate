import { Global, Module } from '@nestjs/common';
import { JobdataService } from '../services/';

@Global()
@Module({
  providers: [JobdataService],
  exports: [JobdataService],
})
export class JobdataModule {}
