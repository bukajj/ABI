import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { CaseCriticalities } from './entity/case.criticalities.entity';
import { Cases } from './entity/case.entity';
import { CaseTypes } from './entity/case.types.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Cases, CaseCriticalities, CaseTypes]),
        UserModule,
        EventModule
      ],
      providers: [CaseService],
      controllers: [CaseController],
      exports:[CaseService],
})
export class CaseModule {}
