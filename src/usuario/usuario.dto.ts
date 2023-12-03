import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class UsuarioDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly telefono: number;

}