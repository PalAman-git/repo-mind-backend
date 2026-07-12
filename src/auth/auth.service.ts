import { Injectable } from '@nestjs/common';
import { GithubProfile } from 'src/github/types/github-profile.types';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserRow } from 'src/users/types/user.types';
import {v4 as uuid} from 'uuid'

@Injectable()
export class AuthService {
    constructor(private readonly userRepo: UserRepository){}

    async validateGithubUser(profile:GithubProfile) : Promise<UserRow | null>{
        let user = await this.userRepo.findByGithubId(profile.githubId);

        if(!user)
        {
            user = await this.userRepo.create({
                id: uuid(),
                githubId: profile.githubId,
                username: profile.username,
                displayName: profile.displayName,
                email: profile.email,
                avatarUrl: profile.avatarUrl,
                githubProfileUrl: profile.githubProfileUrl,
            });
        }
        else{
            user = await this.userRepo.update({
                githubId:profile.githubId,
                username:profile.username,
                displayName:profile.displayName,
                email:profile.email,
                avatarUrl:profile.avatarUrl,
                githubProfileUrl:profile.githubProfileUrl
            })
        }

        return user;
    }
}
