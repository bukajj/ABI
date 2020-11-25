import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaseModule } from './case/case.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:'../ABI.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CaseModule,
    EventModule,
    UserModule,
    MeasureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
