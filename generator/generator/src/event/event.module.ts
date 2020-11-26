import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cases } from 'src/case/entity/case.entity';
import { Measures } from 'src/measure/entity/measure.entity';
import { Users } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { EventCriticalities } from './entity/event.criticality.entity';
import { Events } from './entity/event.entity';
import { EventTypes } from './entity/event.type.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Users, Cases, Events, Measures, EventCriticalities, EventTypes]),
        UserService,
      ],
      providers: [EventService],
      controllers: [EventController],
      exports:[EventService],
})
export class EventModule {}
