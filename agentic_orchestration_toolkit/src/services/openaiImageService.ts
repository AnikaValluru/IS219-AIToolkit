import OpenAI from 'openai';

export interface ImageGenerateOptions {
  model: string;
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1024x1536' | '1536x1024';
  quality?: 'low' | 'medium' | 'high' | 'auto';
}

export interface ImageResult {
  buffer: Buffer;
  extension: string;
  revisedPrompt?: string;
  raw: unknown;
}

export class OpenAIImageService {
  constructor(private readonly client: OpenAI) {}

  async generate(options: ImageGenerateOptions): Promise<ImageResult> {
    const response = await this.client.images.generate({
      model: options.model,
      prompt: options.prompt,
      size: options.size ?? '1024x1024',
      quality: options.quality ?? 'auto'
    });

    const image = response.data?.[0];
    if (!image) {
      throw new Error('OpenAI image generation did not return image data.');
    }

    if (image.b64_json) {
      return {
        buffer: Buffer.from(image.b64_json, 'base64'),
        extension: 'png',
        revisedPrompt: image.revised_prompt,
        raw: response
      };
    }

    if (image.url) {
      const fileResponse = await fetch(image.url);
      if (!fileResponse.ok) {
        throw new Error(`Failed to download image: ${fileResponse.status}`);
      }
      const contentType = fileResponse.headers.get('content-type') ?? '';
      const extension = contentType.includes('jpeg')
        ? 'jpg'
        : contentType.includes('png')
        ? 'png'
        : contentType.includes('webp')
        ? 'webp'
        : 'png';
      const buffer = Buffer.from(await fileResponse.arrayBuffer());
      return {
        buffer,
        extension,
        revisedPrompt: image.revised_prompt,
        raw: response
      };
    }

    return {
      buffer: Buffer.alloc(0),
      extension: 'png',
      revisedPrompt: image.revised_prompt,
      raw: response
    };
  }
}
