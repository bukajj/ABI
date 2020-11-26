import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventCriticalities } from './entity/event.criticality.entity';
import { Events } from './entity/event.entity';
import { EventTypes } from './entity/event.type.entity';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService){}

    @Get()
    async getAllEvents(): Promise<Events[]>{
        return await this.eventService.findAllEvents();
    }

    @Get('criticalities')
    async getAllEventCriticalities(): Promise<EventCriticalities[]>{
        return await this.eventService.findAllEventCriticalities();
    }

    @Get('types')
    async getAllEventTypes(): Promise<EventTypes[]>{
        return await this.eventService.findAllEventTypes();
    }

    @Post('types')
    async generateEventTypes(): Promise<EventTypes[]>{
        return await this.eventService.generateEventTypes();
    }

    @Post('criticalities')
    async generateEventCriticalities(): Promise<EventCriticalities[]>{
        return await this.eventService.generateEventCriticalities();
    }

    @Post(':amount')
    async generateUsers(@Param() params): Promise<boolean>{
        return await this.eventService.generateEvents(params.amount);
    }
}
