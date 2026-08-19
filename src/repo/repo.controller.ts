import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RepoService } from './repo.service';

@Controller('repo')
export class RepoController {
    constructor(private readonly repoService: RepoService){}

    @Post('index')
    async RepoData(@Body('repoUrl') repoUrl: string){
        return this.repoService.indexRepository(repoUrl);
    }

    @Get('/:owner/:repo/file')
    async FileContent(
        @Param('owner') owner:string,
        @Param('repo') repo:string,
        @Param('path') path:string,
    ){
        return this.repoService.getFileContent(owner,repo,path);
    }
}
