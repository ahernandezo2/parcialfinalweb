/* eslint-disable prettier/prettier */
/*archivo src/usuario/usuario.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { faker } from '@faker-js/faker';


describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();

  });

  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for(let i = 0; i < 5; i++){
        const usuario: UsuarioEntity = await repository.save({
          id: faker.lorem.word(),
          nombre: faker.lorem.words(),
          telefono: faker.number.int(),
          redsocial: null,
          fotos: [],
          albums: []})
        usuariosList.push(usuario);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: faker.lorem.word(),
      nombre: faker.lorem.words(),
      telefono: faker.number.int(),
      redsocial: null,
      fotos: [],
      albums: []
    }

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({ where: { id: newUsuario.id } })
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.id).toEqual(newUsuario.id)
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre)
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono)

  });

  it('findOne should return a usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuariosList[0];
    const usuario: UsuarioEntity = await service.findOne(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.id).toEqual(storedUsuario.id)
    expect(usuario.nombre).toEqual(storedUsuario.nombre)
    expect(usuario.telefono).toEqual(storedUsuario.telefono)
  });

  it('findOne should throw an exception for an invalid usuario', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The usuario with the given id was not found")
  });

  it('findAll should return all usuarios', async () => {
    const usuarios: UsuarioEntity[] = await service.findAll();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuariosList.length);
  });

  
});

/*archivo src/usuario/usuario.service.spec.ts*/