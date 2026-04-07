#!/usr/bin/env node

import { Command as Commander } from 'commander';
import { loadEnv } from './config/env';
import { CommandRegistry } from './core/commandRegistry';
import { createContainer } from './container';
import { GeminiCommand } from './commands/geminiCommand';
import { ImageGenerateCommand } from './commands/imageGenerateCommand';
import { WebSearchCommand } from './commands/webSearchCommand';

export async function main(): Promise<void> {
  loadEnv();

  const container = createContainer();
  const program = new Commander();
  program
    .name('ai-toolkit')
    .description('CLI AI toolkit')
    .version('0.1.0');

  const registry = new CommandRegistry();
  registry.register(new WebSearchCommand(container.webSearchService));
  registry.register(new ImageGenerateCommand(container.imageService));
  registry.register(new GeminiCommand(container.geminiService));
  registry.apply(program);

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
