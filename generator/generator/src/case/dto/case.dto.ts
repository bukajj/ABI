import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator"
import { type } from 'os';
import { Users } from 'src/user/entity/user.entity';
import { CaseTypes } from '../entity/case.types.entity';
import { CaseCriticalities } from '../entity/case.criticalities.entity';
import { Events } from "src/event/entity/event.entity";

export class CasesDto{

     @IsString()
     title: string

     @IsString()
     localization: string

     @IsString()
     caseDate: string

     @IsString()
     @IsOptional()
     description: string

     @IsNumber()
     @IsOptional()
     numberOfPeople: number

     @IsString()
     @IsOptional()
     expirationDate: string

     @IsNumber()
     @Max(1)
     @Min(0)
     isClosed: number 

     user: Users

     type: CaseTypes

     criticality: CaseCriticalities

     @IsOptional()
     owner: Users

     @IsOptional()
     event: Events
}