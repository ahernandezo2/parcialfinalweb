import { MinLength, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class RedsocialDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    readonly slogan: string;

}