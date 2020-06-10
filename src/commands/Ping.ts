// Node Imports
import { Message } from 'discord.js';
// Project Imports
import { Command } from './meta/Interface';

/**
    The implementation of the Ping command.
    Responds 'Pong!' to the player calling the command.
*/
export class CommandImpl extends Command {
    run(msg: Message): void {
        console.log(msg.content);
    }
    constructor() {
        super('Ping', 'ping');
    }
}
