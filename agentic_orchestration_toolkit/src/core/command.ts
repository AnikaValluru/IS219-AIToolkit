import type { Command as CommanderProgram } from 'commander';

export interface Command {
  name: string;
  description: string;
  register(program: CommanderProgram): void;
}
