import type { Command as CommanderProgram } from 'commander';
import type { Command } from '../core/command';
import { writeReferenceFile } from '../core/output';
import type { OpenAIWebSearchService } from '../services/openaiWebSearchService';

export class WebSearchCommand implements Command {
  name = 'web-search';
  description = 'Search the web with the OpenAI web search tool';

  constructor(private readonly service: OpenAIWebSearchService) {}

  register(program: CommanderProgram): void {
    program
      .command(this.name)
      .description(this.description)
      .argument('<query>', 'Search query')
      .option('-m, --model <model>', 'OpenAI model', 'gpt-4o-mini')
      .action(async (query: string, options: { model: string }) => {
        try {
          const result = await this.service.search(query, options.model);
          const text = result.text.trim();
          const output = text.length > 0 ? text : 'No output.';
          const content = `# Web Search\n\n**Query:** ${query}\n\n${output}\n`;
          const filePath = await writeReferenceFile(query, content);

          process.stdout.write(`${output}\n`);
          process.stdout.write(`Saved to: ${filePath}\n`);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          process.stderr.write(`${message}\n`);
          process.exitCode = 1;
        }
      });
  }
}
