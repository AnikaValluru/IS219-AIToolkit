import type { Command as CommanderProgram } from 'commander';
import type { Command } from '../core/command';
import { writeImageFile } from '../core/output';
import type { OpenAIImageService } from '../services/openaiImageService';

export class ImageGenerateCommand implements Command {
  name = 'image-generate';
  description = 'Generate an image with OpenAI and save it locally';

  constructor(private readonly service: OpenAIImageService) {}

  register(program: CommanderProgram): void {
    program
      .command(this.name)
      .description(this.description)
      .argument('<prompt>', 'Image prompt')
      .option('-m, --model <model>', 'OpenAI image model', 'gpt-image-1')
      .option('-s, --size <size>', 'Image size', '1024x1024')
      .option('-q, --quality <quality>', 'Image quality', 'auto')
      .action(
        async (
          prompt: string,
          options: { model: string; size: string; quality: string }
        ) => {
          try {
            const result = await this.service.generate({
              model: options.model,
              prompt,
              size: options.size as
                | '256x256'
                | '512x512'
                | '1024x1024'
                | '1024x1536'
                | '1536x1024',
              quality: options.quality as 'low' | 'medium' | 'high' | 'auto'
            });

            const imagePath = await writeImageFile(
              prompt,
              result.buffer,
              result.extension
            );
            const revised = result.revisedPrompt?.trim();

            if (revised) {
              process.stdout.write(`Revised prompt: ${revised}\n`);
            }
            process.stdout.write(`Saved image to: ${imagePath}\n`);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            process.stderr.write(`${message}\n`);
            process.exitCode = 1;
          }
        }
      );
  }
}
