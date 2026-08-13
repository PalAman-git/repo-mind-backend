import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubService {
    constructor(private userService: UsersService){}

    async getRepositories(userId:string){
        const user = await this.userService.getUserById(userId);
        const accessToken = user.github_access_token;

        const response = await fetch("https://api.github.com/user/repos?per_page=100&page=1",{
            headers:{
                Authorization:`Bearer ${accessToken}`,
                Accept: 'application/vnd.github+json',
            },
        })

        const  repositories = await response.json();
        return repositories;
    }
}
