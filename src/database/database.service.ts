import { Injectable,OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private readonly pool: Pool;

    constructor(private readonly configService: ConfigService){
        this.pool = new Pool({
            host:this.configService.get<string>("DATABASE_HOST"),
            port:this.configService.get<number>("DATABASE_PORT"),
            database:this.configService.get<string>("DATABASE_NAME"),
            user:this.configService.get<string>("DATABASE_USER"),
            password:this.configService.get<string>("DATABASE_PASSWORD"),
            ssl:{
                rejectUnauthorized:false
            },
        });
    }

    async query<T extends QueryResultRow = QueryResultRow>(text:string,params?:unknown[]){
        return this.pool.query<T>(text,params);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
