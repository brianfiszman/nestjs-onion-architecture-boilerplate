import { Module } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { AuthorController } from '../../application/controllers';
import { OrmModule } from '../../infrastructure/database/orm';
import { AuthorSchema } from '../entities';
import { AuthorRepository } from '../../infrastructure/repositories';
import { Entities } from '../entities/entities.enum';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Author, schema: AuthorSchema }])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
