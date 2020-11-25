import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class CaseTypesDto{

     @IsString()
     name: string

     @IsString()
     description: string

}