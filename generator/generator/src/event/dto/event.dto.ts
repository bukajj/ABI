import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Users } from 'src/user/entity/user.entity';
import { EventTypes } from '../entity/event.type.entity';
import { EventCriticalities } from '../entity/event.criticality.entity';

export class EventsDto{

     @IsString()
     title: string

     @IsString()
     localization: string

     @IsString()
     eventDate: string

     @IsString()
     @IsOptional()
     description: string

     @IsNumber()
     @IsOptional()
     numberOfPeople: number

     user: Users

     type: EventTypes

     criticality: EventCriticalities
}