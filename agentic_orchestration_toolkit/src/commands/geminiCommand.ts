import type { Command as CommanderProgram } from 'commander';
import { readFile } from 'fs/promises';
import path from 'path';
import type { Command } from '../core/command';
import { writeReferenceFile } from '../core/output';
import type { GeminiService } from '../services/geminiService';

const EXTENSION_TO_MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm'
};

export class GeminiCommand implements Command {
  name = 'gemini';
  description = 'Send a prompt (and optional media) to Gemini and save the response';

  constructor(private readonly service: GeminiService | null) {}

  private detectMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    return EXTENSION_TO_MIME[ext] ?? 'application/octet-stream';
  }

  register(program: CommanderProgram): void {
    program
      .command(this.name)
      .description(this.description)
      .argument('<prompt>', 'Prompt for Gemini')
      .option('-m, --model <model>', 'Gemini model', 'gemini-3-pro')
      .option('-f, --file <path...>', 'Image/video file paths')
      .action(
        async (
          prompt: string,
          options: { model: string; file?: string[] }
        ) => {
          try {
            if (!this.service) {
              throw new Error('GEMINI_API_KEY is missing in the environment.');
            }

            const files = options.file ?? [];
            const media = await Promise.all(
              files.map(async (filePath) => {
                const data = await readFile(filePath);
                return {
                  mimeType: this.detectMimeType(filePath),
                  data: data.toString('base64')
                };
              })
            );

            const result = await this.service.generate({
              model: options.model,
              prompt,
              media
            });

            const output = result.text.trim().length > 0 ? result.text.trim() : 'No output.';
            const fileList = files.length > 0 ? files.join(', ') : 'None';
            const content = `# Gemini Response\n\n**Prompt:** ${prompt}\n\n**Files:** ${fileList}\n\n${output}\n`;
            const filePath = await writeReferenceFile(prompt, content, 'aI_feedback');

            process.stdout.write(`${output}\n`);
            process.stdout.write(`Saved to: ${filePath}\n`);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            process.stderr.write(`${message}\n`);
            process.exitCode = 1;
          }
        }
      );
  }
}
