import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { GithubModule } from 'src/github/github.module';

@Module({
  controllers: [RepoController],
  providers: [RepoService],
  imports:[GithubModule]
})
export class RepoModule {}
