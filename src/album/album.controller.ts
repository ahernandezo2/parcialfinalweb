import { Body, Controller, Delete,HttpCode,Get,Param,Post,UseInterceptors, Put} from '@nestjs/common';
import { AlbumService } from './album.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}
}

