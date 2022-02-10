import { Module } from '@nestjs/common';
import { OrmModule } from '../../infrastructure/database/orm';
import { MovieSchema } from '../entities';
import { Entities } from '../enums/entities.enum';
import { MovieSeederService } from '../services';
import { MovieModule } from './movie.module';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Movie, schema: MovieSchema }]), MovieModule],
  providers: [MovieSeederService],
})
export class MovieSeederModule {}
