// Project Imports
import { EventHandler } from './meta/Interface';

export class ReadyEventHandler implements EventHandler {
    private constructor() { /* Disabled */};
    // Doesn't expect any parameters
    handle(...ctx: any[]): void { console.log('Ready!'); }
}
