/* eslint-disable prettier/prettier */
import { FotoEntity } from '../foto/foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedsocialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    slogan: string;

    @OneToMany(() => FotoEntity, foto => foto.redsocial)
    fotos: FotoEntity[];

    @OneToMany(() => UsuarioEntity, usuario => usuario.redsocial)
    usuarios: FotoEntity[];
}