// Node Imports
import { Message } from 'discord.js';
// Project Imports
import { Command } from './meta/Interface';
import { CommandManager } from './meta/Manager';

/**
    The implementation of the Reload command.
    Reloads all commands and options.
*/
export class CommandImpl extends Command {
    run(msg: Message): void {
        CommandManager.loadAllCommands();
        msg.reply("This demon successfully reloaded all commands!");
    }
    constructor() {
        super('Reload', '^reload$');
    }
}
