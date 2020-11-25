import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Events } from './event.entity';

@Entity()
@Unique(['id', 'name'])
export class EventTypes{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     name: string

     @Column({length: 500})
     description: string

     @OneToMany(type => Events, event => event.type)
     events: Events[]

}