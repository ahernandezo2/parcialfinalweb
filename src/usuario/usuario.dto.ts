import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';
export class UsuarioDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    readonly telefono: string;

}