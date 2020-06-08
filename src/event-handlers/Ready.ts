// Project Imports
import { EventHandler } from './meta/Interface';

/**
    Handles the 'ready' event.
*/
export class ReadyEventHandler implements EventHandler {
    private constructor() {}; // Disables the constructor.
    handle(...ctx: any[]): void { console.log('Ready!'); }
}
