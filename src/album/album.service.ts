import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from "../foto/foto.entity";
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) { }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.titulo || album.titulo.trim() === '') {
            throw new BusinessLogicException("El título del álbum no puede estar vacío.", BusinessError.NOT_FOUND);
        }

        return await this.albumRepository.save(album);
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ["fotos", "usuarios"] });
        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        return album;
    }

    async addPhotoToAlbum(albumId: string, foto: FotoEntity): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id: albumId }, relations: ["fotos"] });
        if (!album) {
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        }

        album.fotos.push(foto);

        await this.albumRepository.save(album);

        return album;
    }

    async deleteAlbum(id: string): Promise<void> {
        const album: AlbumEntity = await this.findOne(id);

        if (!album) {
            throw new BusinessLogicException(`Album with id ${id} not found.`, BusinessError.NOT_FOUND);
        }

        if (album.fotos && album.fotos.length > 0) {
            throw new BusinessLogicException(`No se puede eliminar el álbum porque tiene fotos asignadas.`, BusinessError.PRECONDITION_FAILED);
        }

        await this.albumRepository.remove(album);
    }
}
