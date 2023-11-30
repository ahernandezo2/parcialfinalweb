import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from 'src/foto/foto.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) { }

    async createAlbum(title: string): Promise<AlbumEntity> {
        if (!title) {
            throw new BadRequestException('Title cannot be empty');
        }

        const album = this.albumRepository.create({ title });
        return this.albumRepository.save(album);
    }

    async findAlbumById(id: number): Promise<AlbumEntity | undefined> {
        return this.albumRepository.findOne(id);
    }

    async addFotoEntityToAlbum(albumId: number, foto: FotoEntity): Promise<void> {
        const album = await this.albumRepository.findOne(albumId);

        if (!album) {
            throw new NotFoundException('Album not found');
        }

        if (foto.fecha < album.fechaInicio || foto.fecha > album.fechaFin) {
            throw new BadRequestException('FotoEntity date is not within the album range');
        }

        album.fotos.push(foto);
        await this.albumRepository.save(album);
    }

    async deleteAlbum(id: number): Promise<void> {
        const album = await this.albumRepository.findOne(id, { relations: ['fotos'] });

        if (!album) {
            throw new NotFoundException('Album not found');
        }

        if (album.fotos.length > 0) {
            throw new BadRequestException('Cannot delete album with assigned fotos');
        }

        await this.albumRepository.remove(album);
    }
}
