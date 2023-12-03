import { Body, Controller, Delete, HttpCode, Get, Param, Post, UseInterceptors, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumDto } from './album.dto';
import { AlbumEntity } from './album.entity';
import { plainToInstance } from 'class-transformer';
import { FotoEntity } from 'src/foto/foto.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Get(':albumId')
    async findAlbumById(@Param('albumId') albumId: string) {
        return await this.albumService.findOne(albumId);
    }

    @Post()
    async createAlbum(@Body() albumDto: AlbumDto) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
        return await this.albumService.create(album);
    }

    @Put(':albumId/photos/:fotoId')
    async addPhotoToAlbum(@Param('albumId') albumId: string, @Param('foto') foto: FotoEntity): Promise<AlbumEntity> {
        return await this.albumService.addPhotoToAlbum(albumId, foto);
    }

    @Delete(':AlbumId')
    @HttpCode(204)
    async delete(@Param('AlbumId') AlbumId: string) {
        return await this.albumService.deleteAlbum(AlbumId);
    }
}
