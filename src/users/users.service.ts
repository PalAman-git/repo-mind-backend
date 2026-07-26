import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserRow } from './types/user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository:UserRepository){}

    async getUserById(id:string):Promise<UserRow>{
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    async getUserByGithubId(id:number):Promise<UserRow>{
        const user = await this.usersRepository.findByGithubId(id);

        if(!user){
            throw new NotFoundException("User not found.");
        }

        return user;
    }

    async createUser(dto:CreateUserDto):Promise<UserRow>{
        const user = await this.usersRepository.createUser(dto);

        return user;
    }

    async updateUser(dto: UpdateUserDto): Promise<UserRow>{
        const user = await this.usersRepository.update(dto);

        return user;
    }
}
