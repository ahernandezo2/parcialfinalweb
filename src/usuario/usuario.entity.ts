/* eslint-disable prettier/prettier */
import { RedsocialEntity } from "../redsocial/redsocial.entity";
import { FotoEntity } from "../foto/foto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumEntity } from "../album/album.entity";

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    nombre: string;
    @Column()
    telefono: number;

    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];

    @OneToMany(() => AlbumEntity, album => album.usuario)
    albums: AlbumEntity[];
}
