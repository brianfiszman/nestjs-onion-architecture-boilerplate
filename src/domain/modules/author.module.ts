import { Module } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { AuthorController } from '../../application/controllers';
import { Author } from '../entities';
import { OrmModule } from '../../infrastructure/database/orm';

@Module({
  imports: [OrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
