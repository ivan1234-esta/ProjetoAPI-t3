import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SerieController } from './serie.controller';
import { serieProviders } from './serie.provider';
import { SerieService } from './serie.service';
import { filmeProviders } from 'src/filmes/filme.providers';
import { FilmeService } from 'src/filmes/filme.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SerieController],
  providers: [
    ...serieProviders,
    SerieService,
  ],
})
export class GeneroModule {}