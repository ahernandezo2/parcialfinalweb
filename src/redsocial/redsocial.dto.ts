import {IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class RedsocialDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly telefono: number;

}