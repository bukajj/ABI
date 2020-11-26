import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersDto } from './dto/user.dto';
import { Roles } from './entity/role.entity';
import { Users } from './entity/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('users')
    async getAllUsers(): Promise<Users[]>{
        return await this.userService.findAllUsers();
    }

    @Get('roles')
    async getAllRoles(): Promise<Roles[]>{
        return await this.userService.findAllRoles();
    }

    @Post('roles')
    async generateBasicRoles(): Promise<Roles[]>{
        return await this.userService.createBasicRoles();
    }

    @Post('users/:amount')
    async generateUsers(@Param() params): Promise<any>{
        return await this.userService.createMultipleUsers(params.amount);
    }

    @Post('users')
    async createUser(): Promise<boolean>{
        const roles = await this.userService.findAllRoles();
        const role = roles[0];
        const user: UsersDto = {login: 'Kuba', firstname: 'J', lastname:'Kuba', email: 'kuba@gmail.com', password: 'secret', phoneNumber:'666666666', role};
        return await this.userService.createUser(user);
    }
}
