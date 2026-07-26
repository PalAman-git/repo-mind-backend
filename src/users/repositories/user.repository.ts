import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserRow } from "../types/user.types";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository{
    constructor(private readonly databaseService: DatabaseService){}

    async findByGithubId(githubId:number) : Promise<UserRow | null>{
        const result = await this.databaseService.query<UserRow> (
            `
            SELECT *
            FROM users
            WHERE github_id = $1
            `,
            [githubId],
        );

        return result.rows[0] ?? null;
    }

    async findById(id:string){
        const result = await this.databaseService.query<UserRow>(
            `
            SELECT * 
            FROM users
            WHERE id = $1
            `,
            [id],
        );

        return result.rows[0] ?? null;
    }

    async createUser(dto:CreateUserDto):Promise<UserRow>{
        const result = await this.databaseService.query<UserRow>(
            `
            INSERT INTO users(
                id,
                github_id,
                username,
                display_name,
                email,
                avatar_url,
                github_profile_url,
                github_access_token
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
            `,
            [
                dto.id,
                dto.githubId,
                dto.username,
                dto.displayName,
                dto.email,
                dto.avatarUrl,
                dto.githubProfileUrl,
                dto.githubAccessToken
            ]
        );

        return result.rows[0];
    }

    async update(dto: UpdateUserDto): Promise<UserRow> {
        const result = await this.databaseService.query<UserRow>(
            `
            UPDATE users
            SET
            username = $2,
            display_name = $3,
            email = $4,
            avatar_url = $5,
            github_profile_url = $6,
            github_access_token = $7,
            updated_at = NOW()
            WHERE github_id = $1
            RETURNING *;
            `,
            [
            dto.githubId,
            dto.username,
            dto.displayName,
            dto.email,
            dto.avatarUrl,
            dto.githubProfileUrl,
            dto.githubAccessToken
            ],
        );

        return result.rows[0];
    }
}