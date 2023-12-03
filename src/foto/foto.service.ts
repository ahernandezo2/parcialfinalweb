import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity'; // Asegúrate de importar la entidad correcta
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) { }

    async createFoto(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.ISO > 6400 || foto.ISO < 100) {
            throw new Error('El valor ISO debe estar entre 100 y 6400.');
        }

        if (foto.velObturacion > 250 || foto.velObturacion < 2) {
            throw new Error('La velocidad de obturación debe estar entre 2 y 250.');
        }

        if (foto.apertura > 32 || foto.apertura < 1) {
            throw new Error('La apertura debe estar entre 1 y 32.');
        }

        return await this.fotoRepository.save(foto);
    }

    async findAllFotos(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({});
    }

    async findOne(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({ where: { id }, relations: ["redsocial", "usuario", "album"] });
        if (!foto)
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);

        return foto;
    }

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find({ relations: ["usuario", "redsocial", "album"] });
    }

    async deleteFoto(id: string): Promise<void> {
        try {
            const foto = await this.findOne(id);

            await this.fotoRepository.remove(foto);
        } catch (error) {
            throw new BusinessLogicException(`Foto with id ${id} not found.`, BusinessError.NOT_FOUND);
        }
    }
}
