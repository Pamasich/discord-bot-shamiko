// Project Imports
import { Command } from './meta/Interface';
import { Input } from '../common/wrappers/Message';

// Responds with "Pong!"
// Keep this class name
export class CommandImpl extends Command {
    run(msg: Input): void {
        msg.sendReply("Pong!");
    }
    constructor() {
        super('Ping', '^ping$');
    }
}
