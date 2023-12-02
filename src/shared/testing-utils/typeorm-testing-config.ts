/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { RedsocialEntity } from 'src/redsocial/redsocial.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [AlbumEntity, FotoEntity, RedsocialEntity, UsuarioEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([AlbumEntity, FotoEntity, RedsocialEntity, UsuarioEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/