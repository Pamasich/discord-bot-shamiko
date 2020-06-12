// Project Imports
import { Command, OptionalCommandParams } from './meta/Interface';
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
        super(
            'Reload',
            "Makes me forget about all commands and learn them again.",
            '^reload$',
            {
                syntax: 'reload',
                usages: [{ usage: 'reload', desc: "Hot-reloads all commands." }]
            } as OptionalCommandParams
        );
    }
}
