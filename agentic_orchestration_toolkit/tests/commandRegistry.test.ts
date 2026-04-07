import { describe, expect, it } from 'vitest';
import { Command } from 'commander';
import type { Command as ToolkitCommand } from '../src/core/command';
import { CommandRegistry } from '../src/core/commandRegistry';

describe('CommandRegistry', () => {
  it('registers and applies commands', () => {
    const program = new Command();
    const registry = new CommandRegistry();

    const testCommand: ToolkitCommand = {
      name: 'test',
      description: 'test',
      register: (p) => {
        p.command('test').action(() => undefined);
      }
    };

    registry.register(testCommand);
    registry.apply(program);

    const commands = program.commands.map((cmd) => cmd.name());
    expect(commands).toContain('test');
  });
});
