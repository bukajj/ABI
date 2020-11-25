import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';

export class Roles{

     @IsString()
     name: string

     @IsString()
     description: string

}