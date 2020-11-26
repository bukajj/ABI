import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Users } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { EventCriticalitiesDto } from './dto/event.criticality.dto';
import { EventsDto } from './dto/event.dto';
import { EventTypesDto } from './dto/event.type.dto';
import { EventCriticalities } from './entity/event.criticality.entity';
import { Events } from './entity/event.entity';
import { EventTypes } from './entity/event.type.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Events)
        private readonly eventRepository: Repository<Events>,

        @InjectRepository(EventTypes)
        private readonly eventTypesRepository: Repository<EventTypes>,

        @InjectRepository(EventCriticalities)
        private readonly eventCriticalitiesRepository: Repository<EventCriticalities>,

        private readonly userService: UserService,
    ){}

    async findAllEventCriticalities(): Promise<EventCriticalities[]>{
        return await this.eventCriticalitiesRepository.find();
    }

    async findAllEventTypes(): Promise<EventTypes[]>{
        return await this.eventTypesRepository.find();
    }

    async findAllEvents(): Promise<Events[]>{
        return await this.eventRepository.find();
    }

    async createEventCriticality(eventCriticality: EventCriticalitiesDto): Promise<EventCriticalities>{
        const newCriticality = await this.eventCriticalitiesRepository.save(eventCriticality);

        if(!newCriticality){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }

        return newCriticality;
    }

    async generateEventCriticalities(): Promise<EventCriticalities[]>{
        var eventCriticalities: EventCriticalities[] = [];

        const eventCriticality1: EventCriticalitiesDto = {
            name: 'Wish list',
            description: 'Wish to do',
            color: 'White'
        }
        const eventCriticality2: EventCriticalitiesDto = {
            name: 'Trivial',
            description: 'Trivial event',
            color: 'Green'
        }
        const eventCriticality3: EventCriticalitiesDto = {
            name: 'Low',
            description: 'Low event',
            color: 'Blue'
        }
        const eventCriticality4: EventCriticalitiesDto = {
            name: 'Medium',
            description: 'Medium event',
            color: 'Yellow'
        }
        const eventCriticality5: EventCriticalitiesDto = {
            name: 'High',
            description: 'High event',
            color: 'Orange'
        }
        const eventCriticality6: EventCriticalitiesDto = {
            name: 'Critical',
            description: 'Critical event',
            color: 'Red'
        }
        const eventCriticality7: EventCriticalitiesDto = {
            name: 'Blocker',
            description: 'Blocker event',
            color: 'Black'
        }

        eventCriticalities.push(await this.createEventCriticality(eventCriticality1));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality2));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality3));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality4));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality5));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality6));
        eventCriticalities.push(await this.createEventCriticality(eventCriticality7));

        return eventCriticalities;
    }

    async createEventType(eventType: EventTypesDto): Promise<EventTypes>{
        const newType = await this.eventTypesRepository.save(eventType);
        if(!newType){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }

        return newType;
    }

    async generateEventTypes(): Promise<EventTypes[]>{
        const eventTypes: EventTypes[] = [];

        const eventType1: EventTypesDto = {
            name: 'Car accident',
            description: 'Car accident'
        }
        const eventType2: EventTypesDto = {
            name: 'Train accident',
            description: 'Train accident'
        }
        const eventType3: EventTypesDto = {
            name: 'Child missing',
            description: 'Child missing'
        }
        const eventType4: EventTypesDto = {
            name: 'Fire',
            description: 'Fire'
        }
        const eventType5: EventTypesDto = {
            name: 'Explosion',
            description: 'Explosion'
        }
        const eventType6: EventTypesDto = {
            name: 'Management',
            description: 'Management'
        }
        const eventType7: EventTypesDto = {
            name: 'IT',
            description: 'IT Management'
        }
        const eventType8: EventTypesDto = {
            name: 'Management',
            description: 'Management'
        }
        const eventType9: EventTypesDto = {
            name: 'Emergency',
            description: 'Emergency'
        }
        
        const eventType10: EventTypesDto = {
            name: 'WIFI connection',
            description: 'WIFI connection problems'
        }
        
        eventTypes.push(await this.createEventType(eventType1));
        eventTypes.push(await this.createEventType(eventType2));
        eventTypes.push(await this.createEventType(eventType3));
        eventTypes.push(await this.createEventType(eventType4));
        eventTypes.push(await this.createEventType(eventType5));
        eventTypes.push(await this.createEventType(eventType6));
        eventTypes.push(await this.createEventType(eventType7));
        eventTypes.push(await this.createEventType(eventType8));
        eventTypes.push(await this.createEventType(eventType9));
        eventTypes.push(await this.createEventType(eventType10));

        return eventTypes;
    }

    async createEvent(newEvent: EventsDto): Promise<Events>{
        const createdEvent: Events = await this.eventRepository.save(newEvent);
        if(!createdEvent){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        return createdEvent;
    }

    async generateEvents(amount: number): Promise<boolean>{
        var status = false;
        const localizations = ['Wroclaw', 'Chelm', 'Gliwice', 'Opole', 'Kluczbork', 'Warszawa', 'Torun',
                                'Szczecin', 'Zamosc', 'Lodz', 'Poznan', 'Gdansk', 'Gdynia', 'Olsztyn',
                            'Lublin', 'Rzeszow', 'Krakow', 'Katowice', 'Zakopane', 'Bialystok'];
        const criticalities: EventCriticalities[] = await this.findAllEventCriticalities();
        const types: EventTypes[] = await this.findAllEventTypes();
        const users: Users[] = await this.userService.findAllUsers();

        var i: number=0;
        while(i<amount){
            const criticality = criticalities[this.randomInt(0, criticalities.length-1)];
            const type = types[this.randomInt(0, types.length-1)];
            const title = criticality.color + "Event" + type.name;
            const localization = localizations[this.randomInt(0, localizations.length-1)];
            const description = title + 'description';
            const numberOfPeople = this.randomInt(0, 100);
            const user = users[this.randomInt(0, users.length-1)];
            const year = this.randomInt(2019, 2020);
            const month = this.randomInt(0,11);
            const day = this.randomInt(0,28);
            const hour = this.randomInt(0,23);
            const minute = this.randomInt(0,59);
            var date = new Date(year, month, day, hour, minute);
            if(date> new Date()){date=new Date()}
            const eventDate = date.toUTCString();

            const newEvent: EventsDto = {title, localization, eventDate, description, numberOfPeople, user, type, criticality}

            const createdEvent: Events = await this.eventRepository.save(newEvent);
            if(!createdEvent){return false};
            status=true;
            i++;
        }

        return status;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }
}
