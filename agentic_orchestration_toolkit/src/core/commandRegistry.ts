import type { Command as CommanderProgram } from 'commander';
import type { Command } from './command';

export class CommandRegistry {
  private readonly commands: Command[] = [];

  register(command: Command): void {
    this.commands.push(command);
  }

  apply(program: CommanderProgram): void {
    for (const command of this.commands) {
      command.register(program);
    }
  }
}
