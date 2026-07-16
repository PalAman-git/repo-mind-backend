import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GithubProfile } from 'src/github/types/github-profile.types';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserRow } from 'src/users/types/user.types';
import {v4 as uuid} from 'uuid'

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService : JwtService
    ){}

    async validateGithubUser(profile:GithubProfile) : Promise<UserRow | null>{
        let user = await this.userRepo.findByGithubId(profile.githubId);

        const githubProfile = {
            githubId: profile.githubId,
            username: profile.username,
            displayName: profile.displayName,
            email: profile.email,
            avatarUrl: profile.avatarUrl,
            githubProfileUrl: profile.githubProfileUrl,
        }

        if(!user)
        {
            user = await this.userRepo.create({
                id: uuid(),
                ...githubProfile
            });
        }
        else{
            user = await this.userRepo.update({
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

}
