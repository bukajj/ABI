import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class EventTypes{

     @IsString()
     name: string

     @IsString()
     description: string

}