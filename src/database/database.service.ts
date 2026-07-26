import { Injectable,OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private readonly pool: Pool;

    constructor(private readonly configService: ConfigService){
        this.pool = new Pool({
            connectionString:this.configService.getOrThrow<string>('DATABASE_URL')
        });
    }

    async query<T extends QueryResultRow = QueryResultRow>(text:string,params?:unknown[]){
        return this.pool.query<T>(text,params);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
