import { Body, Controller, Delete, HttpCode, Get, Param, Post, UseInterceptors, Put } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RedsocialDto } from './redsocial.dto';
import { RedsocialEntity } from './redsocial.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('redsocials')
export class RedsocialController {
    constructor(private readonly redsocialService: RedsocialService) { }

    @Post()
    async createLibreria(@Body() redSocialDto: RedsocialDto) {
        const redSocial: RedsocialEntity = plainToInstance(RedsocialEntity, redSocialDto);
        return await this.redsocialService.createLibreria(redSocial);
    }

}
