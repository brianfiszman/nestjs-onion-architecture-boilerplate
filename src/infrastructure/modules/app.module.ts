import { AppController } from './../../application/controllers';
import { Module } from '@nestjs/common';
import { mongoOptions, MongooseModule } from '../database/orm';
import { ProductModule, BookModule } from '../../domain/modules';

@Module({
  imports: [
    MongooseModule.forRoot(mongoOptions.clientUrl),
    ProductModule,
    BookModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
