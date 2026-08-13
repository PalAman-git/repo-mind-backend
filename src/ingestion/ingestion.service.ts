import { Injectable } from '@nestjs/common';

type CodeChunk = {
    filePath: string;
    startLine: number;
    endLine: number;
    content: string;
};

@Injectable()
export class IngestionService {

    chunkFile(content: string,filePath:string,){
        const lines = content.split('\n');

        const chunkSize = 100;
        const overlap = 20;

        const chunks:CodeChunk[] = [];

        let start = 0;

        while(start < lines.length){
            const end = Math.min(
                start + chunkSize,
                lines.length,
            );

            chunks.push({
                filePath,
                startLine:start + 1,
                endLine:end,
                content:lines.slice(start,end).join('\n'),
            })
            start += chunkSize - overlap;
        }

        return chunks;
    }
}
