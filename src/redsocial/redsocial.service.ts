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
    ) { }

    async createLibreria(redSocial: RedsocialEntity): Promise<RedsocialEntity> {
        if (!redSocial.slogan) {
            throw new Error('El slogan no debe estar vacio');
        }

        else if (redSocial.slogan.length <= 10) {
            throw new Error('El slogan debe tener mas de 10 caracteres');
        }

        return await this.redSocialRepository.save(redSocial);
    }
}
