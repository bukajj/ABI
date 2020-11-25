import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Events } from './event.entity';

@Entity()
@Unique(['id', 'name'])
export class EventCriticalities{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     name: string

     @Column({length: 500})
     description: string

     @Column({length: 100})
     color: string

     @OneToMany(type => Events, event => event.criticality)
     events: Events[]

}