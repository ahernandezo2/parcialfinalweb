import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class FotoDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsNumber()
    @IsNotEmpty()
    readonly ISO: number;

    @IsNumber()
    @IsNotEmpty()
    readonly velObturacion: number;

    @IsNumber()
    @IsNotEmpty()
    readonly apertura: number;

    @IsString()
    @IsNotEmpty()
    readonly fecha: string;
}