import { Controller, Get, UseGuards,Req,Res, Post } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('github')
export class GithubController {
    constructor(private readonly githubService:GithubService){}

    @Get('repos')
    @UseGuards(JwtAuthGuard)
    async getRepos(@Req() req:any){
        const repos = await this.githubService.getRepositories(req.user.id);

        return repos;
    }
}
