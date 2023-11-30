import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedsocialModule } from './redsocial/redsocial.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';
import { RedsocialEntity } from './redsocial/redsocial.entity';
import { AlbumEntity } from './album/album.entity';
import { FotoEntity } from './foto/foto.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [RedsocialModule, FotoModule, UsuarioModule, AlbumModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '210403',
    database: 'redsocial',
    entities: [RedsocialEntity, FotoEntity, UsuarioEntity, AlbumEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
