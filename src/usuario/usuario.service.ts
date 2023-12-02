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
    ) {}

    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        try {
            const existingUser = await this.usuarioRepository.findOne({
                where: [{ nombre: usuario.nombre }, { id: usuario.id }],
            });

            if (existingUser) {
                throw new BusinessLogicException('Ya existe un usuario con el mismo nombre de usuario o id electrónico.', BusinessError.BAD_REQUEST);
            }

            const telefonoString = usuario.telefono.toString();
            if (!telefonoString || telefonoString.length <= 10) {
                throw new BusinessLogicException('El número de teléfono debe tener más de 10 caracteres.', BusinessError.PRECONDITION_FAILED);
            }

            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new BusinessLogicException('Error al crear el usuario.', BusinessError.BAD_REQUEST);
        }
    }

    async findOne(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["fotos", "usuarios"] });
        if (!usuario)
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);

        return usuario;
    }

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({ relations: ["fotos", "redsocial", "albums"] });
    }

}
