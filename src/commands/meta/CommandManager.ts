import { Command } from './Command';

/** Contains all the commands known to the bot. */
const commands: Map<string, Command> = new Map();

/**
    Registers a command, making it known to the bot.
    @param name What is used to call the command
    @param command The command object to register
*/
export function registerCommand(name: string, command: Command): void {
    commands.set(name, command);
}

/**
    Retrieves a command.
    If no command with the given name exists, aliases are also checked.
    @param name The name of the command to retrieve
    @returns The command associated with the supplied name
*/
export function getCommand(name: string): Command | undefined {
    // If a command with the name exists, return it
    if (commands.has(name)) return commands.get(name);
    // If not, check aliases
    Array.from(commands.values()).find(command => {
        return (command.aliases as string[]).some(alias => alias === name);
    });
}

/**
    Retrieves all commands as an array.
    @returns An array containing all the commands known to the bot.
*/
export function getAllCommands(): Command[] {
    return Array.from(commands.values());
}
