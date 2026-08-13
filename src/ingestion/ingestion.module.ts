import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ChunkerService } from './chunker/chunker.service';

@Module({
  providers: [IngestionService, ChunkerService]
})
export class IngestionModule {}
