import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.telefono.length != 10) {
            throw new Error('El telefono del usuario debe tener 10 caracteres');
        }

        return await this.usuarioRepository.save(usuario);
    }

    async findOne(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["fotos", "redsocial", "albums"] });
        if (!usuario)
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);

        return usuario;
    }

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ["fotos", "redsocial", "albums"] });
    }

}
