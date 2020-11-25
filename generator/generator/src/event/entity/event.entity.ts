import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Users } from 'src/user/entity/user.entity';
import { EventTypes } from './event.type.entity';
import { EventCriticalities } from './event.criticality.entity';

@Entity()
@Unique(['id'])
export class Events{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     title: string

     @Column({length: 200})
     localization: string

     @Column({length: 200})
     eventDate: string

     @Column({length: 500, nullable: true})
     description: string

     @Column({nullable: true})
     numberOfPeople: number

     @ManyToOne(type => Users, user => user.events, {nullable: false})
     user: Users

     @ManyToOne(type => EventTypes, type => type.events, {nullable: false})
     type: EventTypes

     @ManyToOne(type => EventCriticalities, criticality => criticality.events, {nullable: false})
     criticality: EventCriticalities
}