// Node Imports
import { Message } from 'discord.js';

/**
    Defines an event handler. Specific handlers should implement this.
*/
export interface EventHandler {
    /**
        Handles the event, taking an unspecified number of variable
        parameter types.
        @param ctx Any parameters the event may provide as context
    */
    handle(...ctx: any[]): void
}
