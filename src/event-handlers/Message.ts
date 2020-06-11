// Project Imports
import { EventHandler } from './meta/Interface';
import { CommandManager } from '../commands/meta/Manager';
import { Input } from '../common/wrappers/Message';

/**
    Handles the 'message' event.
*/
export class MessageEventHandler implements EventHandler {
    private constructor() {}; // Disables the constructor.
    handle(...ctx: any[]): void {
        CommandManager.executeFirstApplicableCommand(ctx[0] as Input);
    }
}
