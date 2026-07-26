import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [GithubService],
  imports:[UsersModule],
  controllers: [GithubController]
})
export class GithubModule {}
