import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class LlmService {
    private readonly openai: OpenAI;

    constructor(){
        this.openai = new OpenAI({
            apiKey:process.env.OPENAI_API_KEY,
        })
    }

    async generateAnswer(prompt: string) {
    const response = await this.openai.responses.create({
      model: 'gpt-5.4-mini',
      input: prompt,
    });

    return response.output_text
    }
}
