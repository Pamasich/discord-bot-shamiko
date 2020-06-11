import { Message } from 'discord.js';
import { Command } from './Interface';
import { readdirSync } from 'fs';

export class CommandManager {
    private static commandMap: Map<string, Command> = new Map();

    private constructor() { /* Disabled */ }

    static register(regex: string, command: Command): void {
        this.commandMap.set(regex, command);
    }

    static executeFirstApplicableCommand(msg: Message): void {
        for (let [regex, cmd] of this.commandMap) {
            if (new RegExp(regex).test(msg.content)) {
                (cmd as Command).run(msg);
            }
            break;
        }
    }

    static loadAllCommands() {
        const fileNames: string[] = readdirSync('build/commands/');
        fileNames
            .filter(element => /\.[a-zA-Z0-9]+$/.test(element))
            .forEach(element => {
                new (require('../' + element)).CommandImpl();
            });
    }
}
