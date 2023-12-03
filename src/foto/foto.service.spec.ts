/* eslint-disable prettier/prettier */
/*archivo src/foto/foto.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';
import { faker } from '@faker-js/faker';


describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();

  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for(let i = 0; i < 5; i++){
      const foto: FotoEntity = await repository.save({
      id: faker.lorem.word(),
      ISO: faker.number.int(),
      velObturacion: faker.number.int(),
      apertura: faker.number.int(),
      fecha: faker.lorem.words(),
      usuario: null,
      redsocial: null,
      album: null})
      fotosList.push(foto);

    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a foto by id', async () => {
    const storedFoto: FotoEntity = fotosList[0];
    const foto: FotoEntity = await service.findOne(storedFoto.id);
    expect(foto).not.toBeNull();
    expect(foto.id).toEqual(storedFoto.id)
    expect(foto.ISO).toEqual(storedFoto.ISO)
    expect(foto.velObturacion).toEqual(storedFoto.velObturacion)
    expect(foto.apertura).toEqual(storedFoto.apertura)
  });

  it('findOne should throw an exception for an invalid foto', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });

  it('findAll should return all fotos', async () => {
    const fotos: FotoEntity[] = await service.findAll();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotosList.length);
  });
});

/*archivo src/foto/foto.service.spec.ts*/