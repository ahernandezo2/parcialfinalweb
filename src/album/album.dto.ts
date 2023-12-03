import {IsDate, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;
    
    @IsString()
    @IsNotEmpty()
    readonly fechaFin: string;
    
    @IsString()
    @IsNotEmpty()
    readonly fechaInicio: string;
    
}