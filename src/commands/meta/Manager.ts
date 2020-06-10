import { Message } from 'discord.js';
import { Command } from './Interface';

export class CommandManager {
    private static commandMap: Map<string, Command> = new Map();

    private constructor() { /* Disabled */ }

    static register(regex: string, command: Command): void {
        this.commandMap.set(regex, command);
    }

    static executeFirstApplicableCommand(input: string, msg: Message): void {
        for (let [regex, cmd] of this.commandMap) {
            if (new RegExp(regex).test(input)) {
                (cmd as Command).run(msg);
            }
            break;
        }
    }
}
