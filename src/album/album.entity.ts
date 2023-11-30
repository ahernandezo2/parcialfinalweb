/* eslint-disable prettier/prettier */
import { FotoEntity } from "../foto/foto.entity";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    titulo: string;
    @Column()
    fechaInicio: string;
    @Column()
    fechaFin: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.albums)
    usuario: UsuarioEntity;

    @OneToMany(() => FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];
}
/* archivo: src/artwork/artwork.entity.ts */