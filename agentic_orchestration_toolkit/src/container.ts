import OpenAI from 'openai';
import { OpenAIImageService } from './services/openaiImageService';
import { OpenAIWebSearchService } from './services/openaiWebSearchService';
import { GeminiService } from './services/geminiService';

export interface AppContainer {
  webSearchService: OpenAIWebSearchService;
  imageService: OpenAIImageService;
  geminiService: GeminiService | null;
}

export function createContainer(): AppContainer {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing in the environment.');
  }

  const client = new OpenAI({ apiKey });
  const geminiApiKey = process.env.GEMINI_API_KEY;

  return {
    webSearchService: new OpenAIWebSearchService(client),
    imageService: new OpenAIImageService(client),
    geminiService: geminiApiKey ? new GeminiService(geminiApiKey) : null
  };
}
