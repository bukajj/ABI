import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Cases } from './case.entity';

@Entity()
@Unique(['id', 'name'])
export class CaseCriticalities{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     name: string

     @Column({length: 500})
     description: string

     @Column({length: 100})
     color: string

     @OneToMany(type => Cases, x => x.criticality)
     cases: Cases[]

}