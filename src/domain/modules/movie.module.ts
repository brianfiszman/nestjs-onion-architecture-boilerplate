import { Module } from '@nestjs/common';
import { MovieService } from '../services';
import { MovieController } from '../../application/controllers';
import { OrmModule } from '../../infrastructure/database/orm';
import { MovieSchema } from '../entities';
import { MovieRepository } from '../../infrastructure/repositories';
import { Entities } from '../enums/entities.enum';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Movie, schema: MovieSchema }])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [MovieService, MovieRepository],
})
export class MovieModule {}
