import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class EventTypesDto{

     @IsString()
     name: string

     @IsString()
     description: string

}