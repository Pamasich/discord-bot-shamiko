// Project Imports
import { Command } from './meta/Interface';
import { Input } from '../common/wrappers/Message';

/**
    The implementation of the Ping command.
    Responds 'Pong!' to the player calling the command.
*/
export class CommandImpl extends Command {
    run(msg: Input): void {
        msg.sendReply("Pong!");
    }
    constructor() {
        super('Ping', '^ping$');
    }
}
