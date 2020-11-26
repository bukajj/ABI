import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { CaseService } from 'src/case/case.service';
import { Cases } from 'src/case/entity/case.entity';
import { Users } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { MeasuresDto } from './dto/measure.dto';
import { Measures } from './entity/measure.entity';

@Injectable()
export class MeasureService {
    constructor(
        @InjectRepository(Measures)
        private readonly measuresRepository: Repository<Measures>,

        private readonly userService: UserService,

        private readonly caseService: CaseService
    ){}

    async getAllMeasures(): Promise<Measures[]>{
        return await this.measuresRepository.find();
    }

    async createMeasure(measure: MeasuresDto): Promise<Measures>{
        const newMeasure: Measures = await this.measuresRepository.save(measure);
        if(!newMeasure){
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        return newMeasure;
    }

    async generateMeasures(amount: number): Promise<boolean>{
        var status = false;
        const localizations = ['Wroclaw', 'Chelm', 'Gliwice', 'Opole', 'Kluczbork', 'Warszawa', 'Torun',
            'Szczecin', 'Zamosc', 'Lodz', 'Poznan', 'Gdansk', 'Gdynia', 'Olsztyn',
            'Lublin', 'Rzeszow', 'Krakow', 'Katowice', 'Zakopane', 'Bialystok'];
        const users: Users[] = await this.userService.findAllUsers();
        const cases: Cases[] = await this.caseService.findAllCases();

        var i: number = 0;
        while(i<amount){
            const relatedCase: Cases = cases[this.randomInt(0, cases.length-1)];
            const title = 'Measure for ' + relatedCase.title;
            const description = title + ' description';
            const localization = localizations[this.randomInt(0,localizations.length-1)];
            const isClosed: number = this.randomInt(0,1);

            const user = users[this.randomInt(0, users.length-1)];
            var owner: Users = null;
            const x = this.randomInt(0, 2*users.length);
            if(x< users.length-1){
                owner = users[x]
            }

            const newMeasure: Measures = await this.createMeasure({
                title, localization, description, isClosed,
                user, owner, case:relatedCase
            })

            if(!newMeasure){return false;}
            status = true;
            i++;
        }

        return status;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
