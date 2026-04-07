import OpenAI from 'openai';

export interface WebSearchResult {
  text: string;
  raw: unknown;
}

export class OpenAIWebSearchService {
  constructor(private readonly client: OpenAI) {}

  async search(query: string, model: string): Promise<WebSearchResult> {
    const response = await this.client.responses.create({
      model,
      tools: [{ type: 'web_search' }],
      input: query
    });

    return {
      text: response.output_text ?? '',
      raw: response
    };
  }
}
