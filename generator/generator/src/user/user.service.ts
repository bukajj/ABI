import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './entity/user.entity';
import { InjectRepository} from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult , InsertResult, Raw} from 'typeorm';
import { Roles } from './entity/role.entity';
import { UsersDto } from './dto/user.dto';
import { RolesDto } from './dto/role.dto';

@Injectable()
export class UserService {
     constructor(
          @InjectRepository(Users)
          private readonly userRepository: Repository<Users>,

          @InjectRepository(Users)
          private readonly roleRepository: Repository<Roles>,
     ){}

     async findAllRoles(): Promise<Roles[]>{
          return await this.roleRepository.find();
     }

     async createRole(role: RolesDto): Promise<Roles>{
          const newRole = await this.roleRepository.save({...role});

          if(!newRole){
               throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
          }

          return newRole;
     }

     async createBasicRoles(): Promise<Roles[]>{
          var roles = [];

          const role1 = {
               name: 'Admin',
               description: 'System administrator'
          };

          const role2 = {
               name: 'Admin',
               description: 'System administrator'
          };

          const role3 = {
               name: 'Director',
               description: 'Organization director'
          };

          const role4 = {
               name: 'Operator',
               description: 'System operator'
          };

          const role5 = {
               name: 'Editor',
               description: 'System editor'
          };

          const role6 = {
               name: 'User',
               description: 'System user'
          };

          const role7 = {
               name: 'Emergency',
               description: 'Emergency user'
          };

          const role8 = {
               name: 'IT',
               description: 'IT user'
          };

          const role9 = {
               name: 'Helper',
               description: 'Helper user'
          };

          roles.push(await this.createRole(role1));
          roles.push(await this.createRole(role2));
          roles.push(await this.createRole(role3));
          roles.push(await this.createRole(role4));
          roles.push(await this.createRole(role5));
          roles.push(await this.createRole(role6));
          roles.push(await this.createRole(role7));
          roles.push(await this.createRole(role8));
          roles.push(await this.createRole(role9));

          return roles;
     }

     async findAllUsers(): Promise<Users[]>{
          return await this.userRepository.find();
     }

     async createUser(user: UsersDto): Promise<Boolean>{
          const newUser = await this.userRepository.save({...user});

          if(!newUser){
               throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
          }
          
          return true;
     } 

     async createMultipleUsers(amount: number): Promise<Boolean>{

          var usersAmount = (await this.findAllUsers).length;
          const roles = await this.findAllRoles;
          const rolesAmount = roles.length;
          const names = ['Jakub', 'Marek','Kamil','Aldona','Minerwa',
               'Waldemar','Jacek','Placek','Ola','Tomasz','Paula',
               'Marian','Janusz'];
          const lastnames = ['Nowak', 'Kowalski', 'Kokos', 'Misztal', 'Kura',
                         'Baranowski', 'Palacz', 'Abel', 'Piazza', 'Sarinen'];


          for(var _i=0; _i < amount; _i++){
               const login = 'user' + usersAmount;
               const email = login + '@gmail.com';
               const password = 'secret';
               const firstname = names[this.randomInt(0,names.length-1)];
               const lastname = lastnames[this.randomInt(0,lastnames.length-1)];
               const role = roles[this.randomInt(0,roles.length-1)];
               var phoneNumber = '';

               for(var _j=0; _j<9; _j++){
                    phoneNumber+= this.randomInt(0,9);
               }

               const newUser: UsersDto = {login,firstname,lastname,email,password,phoneNumber,role};

               const status = await this.createUser(newUser);

               usersAmount++;

               if(!status){return false;}
          }

          return true;
     }

     randomInt(min, max){
          return Math.floor(Math.random() * (max - min + 1)) + min;
       }
}
