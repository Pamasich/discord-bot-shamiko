// Project Imports
import { EventHandler } from './meta/Interface';
//import { PingCommand } from '../commands/Ping';
import { Command } from '../commands/meta/Interface';

/**
    Handles the 'message' event.
*/
export class MessageEventHandler implements EventHandler {
    private constructor() {}; // Disables the constructor.
    handle(...ctx: any[]): void {
        // Proof of Concept - Dynamic Command Loading
        let cmdSrc = require('../commands/Ping');
        console.log(new cmdSrc.CommandImpl().name);
    }
}
