import { AuthorRepository } from './../../infrastructure/repositories/author.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { AuthorController } from '../../application/controllers';
import { Author, AuthorSchema } from '../schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
