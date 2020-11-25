import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Roles } from './role.entity';
import { Events } from "../../event/entity/event.entity";
import { Cases } from 'src/case/entity/case.entity';
import { Measures } from 'src/measure/entity/measure.entity';



@Entity()
@Unique(['id', 'email', 'login'])
export class Users{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length:200})
     login: string

     @Column({length:200})
     firstname: string

     @Column({length:200})
     lastname: string

     @Column({length:200,unique: true})
     email: string

     @Column({length:200})
     password: string

     @Column({length:20})
     phoneNumber: string

     @ManyToOne(type => Roles, role => role.users, {nullable: false})
     role: Roles

     @OneToMany(type => Events, event => event.user)
     events: Events[]

     @OneToMany(type => Cases, x => x.user)
     cases: Cases[]

     @OneToMany(type => Cases, x => x.owner)
     assignedCases: Cases[]

     @OneToMany(type => Measures, x => x.owner)
     assignedMeasures: Measures[]
}