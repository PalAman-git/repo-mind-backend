import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GithubProfile } from 'src/github/types/github-profile.types';
import { UserRow } from 'src/users/types/user.types';
import { UsersService } from 'src/users/users.service';
import {v4 as uuid} from 'uuid'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService : JwtService
    ){}

    async validateGithubUser(profile:GithubProfile,githubAccessToken:string) : Promise<UserRow|null>{
        let user = await this.userService.getUserByGithubId(profile.githubId);

        const githubProfile = {
            githubId: profile.githubId,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.email,
            avatarUrl: profile.avatarUrl,
            githubProfileUrl: profile.githubProfileUrl,
            githubAccessToken: githubAccessToken
        }

        if(!user)
        {
            user = await this.userService.createUser({
                id: uuid(),
                ...githubProfile
            });
        }
        else{
            user = await this.userService.updateUser({
                ...githubProfile
            })
        }

        return user;
    }

    async login(user: UserRow){
        const payload = {
            sub: user.id,
            githubId: user.github_id
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        }
    }

    async getCurrentUser(id:string){
        return this.userService.getUserById(id);
    }

}
