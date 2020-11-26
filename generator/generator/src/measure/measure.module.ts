import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseModule } from 'src/case/case.module';
import { UserModule } from 'src/user/user.module';
import { Measures } from './entity/measure.entity';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Measures]),
        UserModule,
        CaseModule
      ],
      providers: [MeasureService],
      controllers: [MeasureController],
      exports:[MeasureService],
})
export class MeasureModule {}
