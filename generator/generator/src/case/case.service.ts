import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/event/entity/event.entity';
import { EventService } from 'src/event/event.service';
import { Users } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CaseCriticalitiesDto } from './dto/case.criticality.dto';
import { CasesDto } from './dto/case.dto';
import { CaseTypesDto } from './dto/case.type.dto';
import { CaseCriticalities } from './entity/case.criticalities.entity';
import { Cases } from './entity/case.entity';
import { CaseTypes } from './entity/case.types.entity';

@Injectable()
export class CaseService {
    constructor(
        @InjectRepository(CaseCriticalities)
        private readonly caseCriticalitiesRepository: Repository<CaseCriticalities>,

        @InjectRepository(CaseTypes)
        private readonly caseTypesRepository: Repository<CaseTypes>,

        @InjectRepository(Cases)
        private readonly caseRepository: Repository<Cases>,

        private readonly userService: UserService,

        private readonly eventService: EventService,
    ){}

    async findAllCaseCriticalities(): Promise<CaseCriticalities[]>{
        return await this.caseCriticalitiesRepository.find();
    }

    async createCaseCriticality(caseCriticality: CaseCriticalitiesDto): Promise<CaseCriticalities>{
        const criticality: CaseCriticalities =  await this.caseCriticalitiesRepository.save(caseCriticality);
        if(!criticality){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        return criticality;
    }

    async generateBasicCaseCriticalities(): Promise<CaseCriticalities[]>{
        var criticalities: CaseCriticalities[] = [];

        const criticality1: CaseCriticalitiesDto = {
            name: 'Wish list',
            description: 'Wish to do',
            color: 'White'
        }
        const criticality2: CaseCriticalitiesDto = {
            name: 'Trivial',
            description: 'Trivial case',
            color: 'Green'
        }
        const criticality3: CaseCriticalitiesDto = {
            name: 'Low',
            description: 'Low case',
            color: 'Blue'
        }
        const criticality4: CaseCriticalitiesDto = {
            name: 'Medium',
            description: 'Medium case',
            color: 'Yellow'
        }
        const criticality5: CaseCriticalitiesDto = {
            name: 'High',
            description: 'High case',
            color: 'Orange'
        }
        const criticality6: CaseCriticalitiesDto = {
            name: 'Critical',
            description: 'Critical case',
            color: 'Red'
        }
        const criticality7: CaseCriticalitiesDto = {
            name: 'Blocker',
            description: 'Blocker case',
            color: 'Black'
        }
        const criticality8: CaseCriticalitiesDto = {
            name: 'Warn',
            description: 'Warn case',
            color: 'Brown'
        }
        const criticality9: CaseCriticalitiesDto = {
            name: 'For manager',
            description: 'For manager case',
            color: 'Grey'
        }

        criticalities.push(await this.createCaseCriticality(criticality1));
        criticalities.push(await this.createCaseCriticality(criticality2));
        criticalities.push(await this.createCaseCriticality(criticality3));
        criticalities.push(await this.createCaseCriticality(criticality4));
        criticalities.push(await this.createCaseCriticality(criticality5));
        criticalities.push(await this.createCaseCriticality(criticality6));
        criticalities.push(await this.createCaseCriticality(criticality7));
        criticalities.push(await this.createCaseCriticality(criticality8));
        criticalities.push(await this.createCaseCriticality(criticality9));

        return criticalities;
    }

    async findAllCaseTypes(): Promise<CaseTypes[]>{
        return await this.caseTypesRepository.find();
    }

    async createCaseType(type: CaseTypesDto): Promise<CaseTypes>{
        const newType: CaseTypes = await this.caseTypesRepository.save(type);
        if(!newType){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        return newType;
    }

    async generateBasicCaseTypes(): Promise<CaseTypes[]>{
        var types: CaseTypes[]= [];

        const type1: CaseTypesDto = {
            name: 'IT',
            description: 'Resolving IT problems'
        }
        const type2: CaseTypesDto = {
            name: 'Power',
            description: 'Resolving power problems'
        }
        const type3: CaseTypesDto = {
            name: 'Accident',
            description: 'Accident problems'
        }
        const type4: CaseTypesDto = {
            name: 'HR',
            description: 'HR problems'
        }
        const type5: CaseTypesDto = {
            name: 'Train',
            description: 'Train problems'
        }
        const type6: CaseTypesDto = {
            name: 'Mechanical failure',
            description: 'Mechanical failure'
        }
        const type7: CaseTypesDto = {
            name: 'Emergency',
            description: 'Emergency'
        }
        const type8: CaseTypesDto = {
            name: 'Fire',
            description: 'Fire'
        }

        types.push(await this.createCaseType(type1));
        types.push(await this.createCaseType(type2));
        types.push(await this.createCaseType(type3));
        types.push(await this.createCaseType(type4));
        types.push(await this.createCaseType(type5));
        types.push(await this.createCaseType(type6));
        types.push(await this.createCaseType(type7));
        types.push(await this.createCaseType(type8));

        return types;
    }

    async getAllCases(): Promise<Cases[]>{
        return await this.caseRepository.find();
    }

    async createCase(newCase: CasesDto): Promise<Cases>{
        const createdCase: Cases = await this.caseRepository.save(newCase);
        if(!createdCase){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        return createdCase;
    }

    async generateCases(amount: number): Promise<boolean>{
        var status = false;
        const localizations = ['Wroclaw', 'Chelm', 'Gliwice', 'Opole', 'Kluczbork', 'Warszawa', 'Torun',
            'Szczecin', 'Zamosc', 'Lodz', 'Poznan', 'Gdansk', 'Gdynia', 'Olsztyn',
            'Lublin', 'Rzeszow', 'Krakow', 'Katowice', 'Zakopane', 'Bialystok'];
        const caseCriticalities: CaseCriticalities[] = await this.findAllCaseCriticalities();
        const caseTypes: CaseTypes[] = await this.findAllCaseTypes();
        const users: Users[] = await this.userService.findAllUsers();
        const events: Events[] = await this.eventService.findAllEvents();

        var i: number = 0;
        while(i<amount){
            const criticality = caseCriticalities[this.randomInt(0,caseCriticalities.length-1)];
            const type = caseTypes[this.randomInt(0,caseTypes.length-1)];
            const title = criticality.color + ' Case ' + type.name;
            const localization = localizations[this.randomInt(0, localizations.length-1)];
            const description = title + ' description';
            const numberOfPeople = this.randomInt(0, 100);

            var year = this.randomInt(2019, 2020);
            var month = this.randomInt(0,11);
            var day = this.randomInt(0,28);
            var hour = this.randomInt(0,23);
            var minute = this.randomInt(0,59);
            var date = new Date(year, month, day, hour, minute);
            if(date> new Date()){date=new Date()}
            const caseDate = date.toUTCString();

            year = this.randomInt(2019, 2020);
            month = this.randomInt(0,11);
            day = this.randomInt(0,28);
            hour = this.randomInt(0,23);
            minute = this.randomInt(0,59);
            var date1 = new Date(year, month, day, hour, minute);
            if(date1 < date){date1=new Date()}
            const expirationDate = date1.toUTCString();

            const isClosed: number = this.randomInt(0,1);

            const user = users[this.randomInt(0, users.length-1)];
            var owner: Users = null;
            const x = this.randomInt(0, 2*users.length);
            if(x< users.length-1){
                owner = users[x]
            }

            var event: Events = null;
            const y = this.randomInt(0, 2*events.length);
            if(x< events.length-1){
                event = events[x]
            }

            const newCase: Cases = await this.createCase({title, localization, 
                        caseDate, description, numberOfPeople,expirationDate,
                    isClosed, user, type, criticality, owner, event});

            if(!newCase){return false;}
            
            i++;
            status = true;
        }

        return status;
    }

    async findAllCases(): Promise<Cases[]>{
        return await this.caseRepository.find();
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}
