import { Command } from './Interface';

export class CommandManager {
    private static commandMap: Map<string, Command> = new Map();

    private constructor() { /* Disabled */ }

    static register(regex: string, command: Command): void {
        this.commandMap.set(regex, command);
    }

    static executeFirstApplicableCommand(input: string): void {
        for (let [regex, cmd] of this.commandMap) {
            if (new RegExp(regex).test(input)) {
                console.log((cmd as Command).name);
            }
            break;
        }
    }
}
