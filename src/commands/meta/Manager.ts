import { Input } from '../../common/wrappers/Message';
import { Command } from './Interface';
import { readdirSync } from 'fs';

export class CommandManager {
    private static commandMap: Map<string, Command> = new Map();

    private constructor() { /* Disabled */ }

    static register(regex: string, command: Command): void {
        this.commandMap.set(regex, command);
    }

    static executeFirstApplicableCommand(msg: Input): void {
        for (let [regex, cmd] of this.commandMap) {
            if (new RegExp(regex).test(msg.content.trim())) {
                (cmd as Command).run(msg);
                break;
            }
        }
    }

    static loadAllCommands() {
        this.commandMap.clear();
        const fileNames: string[] = readdirSync('build/commands/');
        fileNames
            .filter(element => /\.[a-zA-Z0-9]+$/.test(element))
            .forEach(element => {
                delete require.cache[require.resolve('../' + element)];
                new (require('../' + element)).CommandImpl();
            });
    }
}
