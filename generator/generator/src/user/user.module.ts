import { Module } from '@nestjs/common';
import { Cases } from 'src/case/entity/case.entity';
import { Events } from 'src/event/entity/event.entity';
import { Measures } from 'src/measure/entity/measure.entity';
import { Roles } from './entity/role.entity';
import { Users } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
     imports:[
          TypeOrmModule.forFeature([Users, Roles])
        ],
        providers: [UserService],
        controllers: [UserController],
        exports:[UserService],
})
export class UserModule {}
