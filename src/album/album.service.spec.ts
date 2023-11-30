import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an album', () => {
    service.createAlbum('Test Album');
    expect(service['albums'].length).toBe(1);
  });

  it('should find an album by id', () => {
    service.createAlbum('Test Album');
    const album = service.findAlbumById(1);
    expect(album).toBeDefined();
  });

  it('should add a photo to an album', () => {
    service.createAlbum('Test Album');
    const photoDate = new Date();
    service.addPhotoToAlbum(1, photoDate);
    expect(service.findAlbumById(1).photos.length).toBe(1);
  });

  it('should not add a photo to an album outside the date range', () => {
    service.createAlbum('Test Album');
    const photoDate = new Date('2023-04-21');
    expect(() => service.addPhotoToAlbum(1, photoDate)).toThrow(
      'La fecha de la foto no está dentro del rango del álbum',
    );
  });

  it('should not delete an album with assigned photos', () => {
    service.createAlbum('Test Album');
    const photoDate = new Date();
    service.addPhotoToAlbum(1, photoDate);
    expect(() => service.deleteAlbum(1)).toThrow(
      'No se puede eliminar un álbum con fotos asignadas',
    );
  });
});
