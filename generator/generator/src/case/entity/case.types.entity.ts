import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Cases } from './case.entity';

@Entity()
@Unique(['id', 'name'])
export class CaseTypes{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     name: string

     @Column({length: 500})
     description: string

     @OneToMany(type => Cases, x => x.type)
     cases: Cases[]

}