import { Entity, Column, PrimaryGeneratedColumn, Unique, Index, OneToMany , ManyToOne} from 'typeorm';
import { IsDate, isDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { type } from 'os';
import { Users } from 'src/user/entity/user.entity';
import { CaseTypes } from './case.types.entity';
import { CaseCriticalities } from './case.criticalities.entity';
import { Events } from 'src/event/entity/event.entity';
import { Measures } from 'src/measure/entity/measure.entity';


@Entity()
@Unique(['id'])
export class Cases{
     @PrimaryGeneratedColumn()
     id : number;

     @Column({length: 200})
     title: string

     @Column({length: 200})
     localization: string

     @Column({length: 200})
     caseDate: string

     @Column({length: 500, nullable: true})
     description: string

     @Column({nullable: true})
     numberOfPeople: number

     @Column({length: 200, nullable: true})
     expirationDate: string

     @Column()
     isClosed: number 

     @ManyToOne(type => Users, user => user.cases, {nullable: false})
     user: Users

     @ManyToOne(type => CaseTypes, type => type.cases, {nullable: false})
     type: CaseTypes

     @ManyToOne(type => CaseCriticalities, criticality => criticality.cases, {nullable: false})
     criticality: CaseCriticalities

     @ManyToOne(type => Users, owner => owner.assignedCases)
     owner: Users

     @ManyToOne(type => Events, x=>x.cases)
     event: Events

     @OneToMany(type => Measures, x=>x.case)
     measures: Measures[]
}