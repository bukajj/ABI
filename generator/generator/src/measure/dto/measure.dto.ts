import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator"
import { maxHeaderSize } from "http";
import { Users } from 'src/user/entity/user.entity';

export class MeasuresDto{

     @IsString()
     title: string

     @IsString()
     localization: string

     @IsString()
     description: string

     @IsNumber()
     @Max(1)
     @Min(0)
     isClosed: number 

     user: Users

     owner: Users
}