/* eslint-disable prettier/prettier */
import { RedsocialEntity } from "../redsocial/redsocial.entity";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlbumEntity } from "../album/album.entity";

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    ISO: number;
    @Column()
    velObturacion: number;
    @Column()
    apertura: number;
    @Column()
    fecha: string;

    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.fotos)
    redsocial: RedsocialEntity;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;

    @ManyToOne(() => AlbumEntity, album => album.artworks)
    album: AlbumEntity;
}
