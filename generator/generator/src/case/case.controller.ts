import { Controller, Get, Param, Post } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseCriticalities } from './entity/case.criticalities.entity';
import { Cases } from './entity/case.entity';
import { CaseTypes } from './entity/case.types.entity';

@Controller('cases')
export class CaseController {
    constructor(private readonly caseService: CaseService){}

    @Get('criticalities')
    async getAllCaseCriticalities(): Promise<CaseCriticalities[]>{
        return await this.caseService.findAllCaseCriticalities();
    }

    @Get('types')
    async getAllCaseTypes(): Promise<CaseTypes[]>{
        return await this.caseService.findAllCaseTypes();
    }

    @Post('criticalities')
    async generateBasicCaseCriticalities(): Promise<CaseCriticalities[]>{
        return await this.caseService.generateBasicCaseCriticalities();
    }

    @Post('types')
    async generateBasicCaseTypes(): Promise<CaseTypes[]>{
        return await this.caseService.generateBasicCaseTypes();
    }

    @Get()
    async getAllCases(): Promise<Cases[]>{
        return await this.caseService.getAllCases();
    }

    @Post(':amount')
    async generateCases(@Param() params): Promise<boolean>{
        return await this.caseService.generateCases(params.amount);
    }
}
