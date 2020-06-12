// Project Imports
import { Command } from './meta/Interface';
import { CommandManager } from './meta/Manager';
import { Input } from '../common/wrappers/Message';

// Reloads all commands
// Keep this class name
export class CommandImpl extends Command {
    run(msg: Input): void {
        CommandManager.loadAllCommands();
        msg.sendReply("This demon successfully reloaded all commands!");
    }
    constructor() {
        super('Reload', '^reload$');
    }
}
