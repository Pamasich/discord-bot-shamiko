// Project Imports
import { Command } from './meta/Interface';
import { CommandManager } from './meta/Manager';
import { Input } from '../common/wrappers/Message';

/**
    The implementation of the Reload command.
    Reloads all commands and options.
*/
export class CommandImpl extends Command {
    run(msg: Input): void {
        CommandManager.loadAllCommands();
        msg.sendReply("This demon successfully reloaded all commands!");
    }
    constructor() {
        super('Reload', '^reload$');
    }
}
