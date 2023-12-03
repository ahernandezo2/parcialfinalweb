import { Body, Controller, Delete, HttpCode, Get, Param, Post, UseInterceptors, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async createUsuario(@Body() usuarioDto: UsuarioDto) {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.usuarioService.createUsuario(usuario);
    }

    @Get(':usuarioId')
    async findUsuarioById(@Param('usuarioId') usuarioId: string) {
        return await this.usuarioService.findOne(usuarioId);
    }

    @Get()
    async findAll() {
        return await this.usuarioService.findAll();
    }
}
