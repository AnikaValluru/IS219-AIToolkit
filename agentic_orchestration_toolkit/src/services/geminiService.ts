export interface GeminiMediaPart {
  mimeType: string;
  data: string;
}

export interface GeminiGenerateOptions {
  model: string;
  prompt: string;
  media?: GeminiMediaPart[];
}

export interface GeminiResult {
  text: string;
  raw: unknown;
}

export class GeminiService {
  constructor(
    private readonly apiKey: string,
    private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta'
  ) {}

  async generate(options: GeminiGenerateOptions): Promise<GeminiResult> {
    const url = `${this.baseUrl}/models/${options.model}:generateContent?key=${this.apiKey}`;
    const parts = [{ text: options.prompt }];

    if (options.media && options.media.length > 0) {
      for (const media of options.media) {
        parts.push({
          inlineData: {
            mimeType: media.mimeType,
            data: media.data
          }
        } as unknown as { inlineData: unknown });
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts
          }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const text =
      data.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part.text)
        .filter((part): part is string => Boolean(part))
        .join('\n') ?? '';

    return {
      text,
      raw: data
    };
  }
}
