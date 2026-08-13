import { Body, Controller, Get, Post } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller('repo')
export class RepoController {
    constructor(private readonly repoService: RepoService){}

    @Post('index')
    async RepoData(@Body('repoUrl') repoUrl: string){
        return this.repoService.indexRepository(repoUrl);
    }
}
