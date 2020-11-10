import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthorService } from '../../domain/services/author.service';
import { AuthorController } from '../controllers';
import { Author } from './../../domain/entities/Author';

@Module({
  imports: [MikroOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
