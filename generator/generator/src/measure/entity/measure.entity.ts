import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Users } from 'src/user/entity/user.entity';


@Entity()
@Unique(['id'])
export class Measures{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     title: string

     @Column({length: 200})
     localization: string

     @Column({length: 500, nullable: true})
     description: string

     @Column()
     isClosed: number 

     @ManyToOne(type => Users, user => user.cases, {nullable: false})
     user: Users

     @ManyToOne(type => Users, owner => owner.assignedMeasures)
     owner: Users
}