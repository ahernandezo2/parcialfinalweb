/* eslint-disable prettier/prettier */
import { RedsocialEntity } from "../redsocial/redsocial.entity";
import { MuseumEntity } from "../museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImageEntity } from "../image/image.entity";
import { ArtistEntity } from "../artist/artist.entity";

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    nombre: string;
    @Column()
    telefono: number;

    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.artworks)
    redsocial: RedsocialEntity;

    @ManyToOne(() => ExhibitionEntity, exhibition => exhibition.artworks)
    exhibition: ExhibitionEntity;

    @OneToMany(() => ImageEntity, image => image.artwork)
    images: ImageEntity[];

    @ManyToOne(() => ArtistEntity, artist => artist.artworks)
    artist: ArtistEntity;
}
/* archivo: src/artwork/artwork.entity.ts */
