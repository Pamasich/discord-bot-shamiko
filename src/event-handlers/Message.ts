// Project Imports
import { EventHandler } from './meta/Interface';
import { CommandManager } from '../commands/meta/Manager';

/**
    Handles the 'message' event.
*/
export class MessageEventHandler implements EventHandler {
    private constructor() {}; // Disables the constructor.
    handle(...ctx: any[]): void {
        // Temporary
        new (require('../commands/Ping')).CommandImpl();
        CommandManager.executeFirstApplicableCommand('ping');
    }
}
