// Project Imports
import { Command, OptionalCommandParams } from './meta/Interface';
import { Input } from '../common/wrappers/Message';

// Responds with "Pong!"
// Keep this class name
export class CommandImpl extends Command {
    run(msg: Input): void {
        msg.sendReply("Pong!");
    }
    constructor() {
        super(
            'Ping',
            "Makes me reply with a Pong!",
            '^ping$',
            {
                syntax: 'ping',
                usages: [{usage: 'ping', desc: "Replies with 'Pong!'"}]
            } as OptionalCommandParams
        );
    }
}
