// Node Imports
import { readdirSync } from 'fs';
// Project Imports
import { Input } from '../../common/wrappers/Message';
// Local Imports
import { Command } from './Interface';

export class CommandManager {
    // the index is a regex used to match input
    private static commandMap: Map<string, Command> = new Map();

    private constructor() { /* Disabled */ }

    static register(regex: string, command: Command): void {
        this.commandMap.set(regex, command);
    }

    // Run the first command where the input string is matched by the regex
    static executeFirstApplicableCommand(msg: Input): void {
        for (let [regex, cmd] of this.commandMap) {
            if (new RegExp(regex).test(msg.content.trim())) {
                (cmd as Command).run(msg);
                break;
            }
        }
    }

    static loadAllCommands() {
        // In case this method has been called before
        this.commandMap.clear();
        // load all filenames
        const fileNames: string[] = readdirSync('build/commands/');
        fileNames
            .filter(element => /\.[a-zA-Z0-9]+$/.test(element))
            .forEach(element => {
                // uncache the file first, otherwise node won't load it
                delete require.cache[require.resolve(`../${element}`)];
                // dynamically load the file and then instantiate the class
                new (require('../' + element)).CommandImpl();
            });
    }
}
