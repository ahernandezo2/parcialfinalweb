import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity'; // Asegúrate de importar la entidad correcta
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RedsocialService {
    constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redSocialRepository: Repository<RedsocialEntity>
    ) {}

    async createLibreria(redSocial: RedsocialEntity): Promise<RedsocialEntity> {
        try {
            // Verificar que el slogan no esté vacío
            if (!redSocial.slogan || redSocial.slogan.trim() === '') {
                throw new BusinessLogicException('El slogan no puede estar vacío.', BusinessError.BAD_REQUEST);
            }

            // Verificar que el slogan tenga al menos 20 caracteres
            if (redSocial.slogan.length < 20) {
                throw new BusinessLogicException('El slogan debe tener al menos 20 caracteres.', BusinessError.PRECONDITION_FAILED);
            }

            // Si pasa las validaciones, guardar la red social en la base de datos
            return await this.redSocialRepository.save(redSocial);
        } catch (error) {
            throw new BusinessLogicException('Error al crear la red social.', BusinessError.BAD_REQUEST);
        }
    }
}
