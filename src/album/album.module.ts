import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './album.controller';
import { FotoEntity } from '../foto/foto.entity';




@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule {}
