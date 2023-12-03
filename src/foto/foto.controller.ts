import { Body, Controller, Delete, HttpCode, Get, Param, Post, UseInterceptors, Put } from '@nestjs/common';
import { FotoService } from './foto.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('foto')
export class FotoController {
    constructor(private readonly fotoService: FotoService) { }

    @Post()
    async createFoto(@Body() fotoDto: FotoDto) {
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
        return await this.fotoService.createFoto(foto);
    }

    @Get(':fotoId')
    async findFotoById(@Param('fotoId') fotoId: string) {
        return await this.fotoService.findOne(fotoId);
    }

    @Get()
    async findAll() {
        return await this.fotoService.findAll();
    }

    @Delete(':FotoId')
    @HttpCode(204)
    async delete(@Param('FotoId') FotoId: string) {
        return await this.fotoService.deleteFoto(FotoId);
    }
}
