import { Controller, Get, Param, Post } from '@nestjs/common';
import { Measures } from './entity/measure.entity';
import { MeasureService } from './measure.service';

@Controller('measures')
export class MeasureController {
    constructor(private readonly measureService: MeasureService){}

    @Get()
    async getAllMeasures(): Promise<Measures[]>{
        return await this.measureService.getAllMeasures();
    }

    @Post(':amount')
    async generateMeasures(@Param() params): Promise<boolean>{
        return this.measureService.generateMeasures(params.amount);
    }
}
