import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { Roles } from '../entity/role.entity';


export class UsersDto{
     
     @IsString()
     login: string

     @IsString()
     firstname: string

     @IsString()
     lastname: string

     @IsEmail()
     email: string

     @IsString()
     password: string

     @IsString()
     phoneNumber: string

     role: Roles
}