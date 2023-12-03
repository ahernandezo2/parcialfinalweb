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
    ) {}

    async createFoto(fotoData: Partial<FotoEntity>): Promise<FotoEntity> {
        try {
            // Validaciones
            if (!(fotoData.ISO >= 100 && fotoData.ISO <= 6400) ||
                !(fotoData.velObturacion >= 2 && fotoData.velObturacion <= 250) ||
                !(fotoData.apertura >= 1 && fotoData.apertura <= 32)) {
                throw new BusinessLogicException('Los valores de ISO, velocidad de obturación y apertura deben cumplir con los requisitos.', BusinessError.BAD_REQUEST);
            }

            // Verificar que al menos dos valores estén por encima del valor medio de sus cotas
            const valoresPorEncima = [fotoData.ISO > 3250, fotoData.velObturacion > 126, fotoData.apertura > 16].filter(Boolean);

            if (valoresPorEncima.length < 2) {
                throw new BusinessLogicException('Al menos dos de los valores (ISO, velocidad de obturación, apertura) deben estar por encima del valor medio de sus cotas.', BusinessError.BAD_REQUEST);
            }

            // Crear la foto
            const foto = this.fotoRepository.create(fotoData);

            // Guardar la foto en la base de datos
            return await this.fotoRepository.save(foto);
        } catch (error) {
            throw new BusinessLogicException('Error al crear la foto.', BusinessError.BAD_REQUEST);
        }
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
