import { Command } from './Command';

const commands: Map<string, Command> = new Map();

export function registerCommand(name: string, command: Command): void {
    commands.set(name, command);
}

export function getCommand(name: string): Command | undefined {
    if (commands.has(name)) return commands.get(name);
    Array.from(commands.values()).find(command => {
        return (command.aliases as string[]).some(alias => alias === name);
    });
}

export function getAllCommands(): Command[] {
    return Array.from(commands.values());
}
