/* eslint-disable prettier/prettier */
/*archivo src/album/album.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';


describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumsList: AlbumEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumsList = [];
    for(let i = 0; i < 5; i++){
        const album: AlbumEntity = await repository.save({
        id: faker.lorem.word(),
        titulo: faker.lorem.words(),
        fechaInicio: faker.date.past().toISOString(),
        fechaFin: faker.date.future().toISOString(),
        usuario: null,
        fotos: []})
        albumsList.push(album);

    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: faker.lorem.word(),
      titulo: faker.lorem.words(),
      fechaInicio: faker.date.past().toISOString(),
      fechaFin: faker.date.future().toISOString(),
      usuario: null,
      fotos: []
    }

    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({ where: { id: newAlbum.id } })
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.id).toEqual(newAlbum.id)
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo)
    expect(storedAlbum.fechaFin).toEqual(newAlbum.fechaFin)
    expect(storedAlbum.fechaInicio).toEqual(newAlbum.fechaInicio)
  });

  it('findOne should return a album by id', async () => {
    const storedAlbum: AlbumEntity = albumsList[0];
    const album: AlbumEntity = await service.findOne(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.id).toEqual(storedAlbum.id)
    expect(album.titulo).toEqual(storedAlbum.titulo)
    expect(album.fechaFin).toEqual(storedAlbum.fechaFin)
    expect(album.fechaInicio).toEqual(storedAlbum.fechaInicio)
    expect(album.usuario).toEqual(storedAlbum.usuario)
  });

  it('findOne should throw an exception for an invalid album', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

  it('addPhotoToAlbum should add a photo to the album', async () => {
    const existingAlbum: AlbumEntity = albumsList[0];

    // Crear una foto utilizando faker
    const fakeFoto: FotoEntity = {
      id: faker.string.uuid(),
      ISO: faker.number.int(),
      velObturacion:faker.number.int(),
      apertura: faker.number.int(),
      fecha: faker.string.alpha(),
      redsocial: null,
      album: existingAlbum,
      usuario: null
    };

    const updatedAlbum: AlbumEntity = await service.addPhotoToAlbum(existingAlbum.id, fakeFoto);

    expect(updatedAlbum.fotos).toHaveLength(existingAlbum.fotos.length + 1);
    expect(updatedAlbum.fotos.find(photo => photo.id === fakeFoto.id)).toBeDefined();
  });

  it('addPhotoToAlbum should throw an exception for a non-existent album', async () => {
    const nonExistentAlbumId: string = 'nonExistentAlbumId';
    const nonExistentAlbum: AlbumEntity = {
      id: nonExistentAlbumId,
      titulo: faker.lorem.words(),
      fechaInicio: faker.date.past().toISOString(),
      fechaFin: faker.date.future().toISOString(),
      fotos: [],
      usuario: null
    };

    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });

  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.deleteAlbum(album.id);
  
    const deletedAlbum: AlbumEntity = await repository.findOne({ where: { id: album.id } })
    expect(deletedAlbum).toBeNull();
  });

  it('delete should throw an exception for an invalid album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.deleteAlbum(album.id);
    await expect(() => service.deleteAlbum("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
  });
});

/*archivo src/album/album.service.spec.ts*/