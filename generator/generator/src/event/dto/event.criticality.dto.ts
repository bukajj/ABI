import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class EventCriticalitiesDto{

     @IsString()
     name: string

     @IsString()
     description: string

     @IsString()
     color: string

}