import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserRow } from "../types/user.types";

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
}