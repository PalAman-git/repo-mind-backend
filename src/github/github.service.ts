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

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const  repositories = await response.json();
        return repositories;
    }

    async getPublicRepository(owner:string,repo:string){
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`,
            {
                headers:{
                    Accept:'application/vnd.github+json'
                }
            }
        )

        if(!response.ok){
            throw new Error(`GitHub API error: ${response.status}`)
        }

        return response.json();
    }

    async getPublicRepositoryTree(owner: string,repo: string,branch: string,) 
    {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        return response.json();
    }

    async getRepoLanguages(owner:string,repo:string){
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`,{
            headers:{
                Accept:'application/vnd.github+json',
            }
        })

        if(!response.ok){
            throw new Error(`Github API error: ${response.status}`);
        }

        return response.json();
    }

    async getFileContent(owner: string,repo: string,path: string,) 
    {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            throw new Error(`${path} is a directory`);
        }

        if (data.encoding !== 'base64') {
            throw new Error(`Unexpected encoding for ${path}`);
        }

        return Buffer.from(data.content, 'base64').toString('utf-8');
    }


}
