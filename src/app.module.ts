import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedsocialModule } from './redsocial/redsocial.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [RedsocialModule, FotoModule, UsuarioModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
