import { Injectable } from '@nestjs/common';
import { GithubService } from 'src/github/github.service';

type parsedUrl = {
    owner:string
    repo: string
}

@Injectable()
export class RepoService {
    constructor(private readonly githubService: GithubService){}

    parseGithubUrl(repoUrl:string): parsedUrl{
        const baseGithubUrl = 'https://github.com/'

        if (!repoUrl.startsWith(baseGithubUrl)) {
            throw new Error('Invalid GitHub repository URL');
        }

        const result = repoUrl.substring(baseGithubUrl.length)

        const ownerAndRepo = result.split('/');
        const owner = ownerAndRepo[0];
        const repo = ownerAndRepo[1];

        return {owner,repo}
    }

    async indexRepository(repoUrl: string){
        const {owner,repo} = this.parseGithubUrl(repoUrl);
        const defaultBranch = 'main'

        const repoTree = await this.githubService.getPublicRepositoryTree(owner,repo,defaultBranch);

        return repoTree;
    }

    async getFileContent(owner:string,repo:string,path:string){
        const content = await this.githubService.getFileContent(owner,repo,path);

        return content;
    }


}
