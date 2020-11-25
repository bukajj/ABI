import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Users } from './user.entity';

@Entity()
@Unique(['id'])
export class Roles{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     name: string

     @Column({length:500})
     description: string

     @OneToMany(type => Users, user => user.role)
     users: Users[]
}