// Project Imports
import { EventHandler } from './meta/Interface';

/**
    Handles the 'message' event.
*/
export class MessageEventHandler implements EventHandler {
    private constructor() {}; // Disables the constructor.
    handle(...ctx: any[]): void { console.log(ctx[0]); }
}
