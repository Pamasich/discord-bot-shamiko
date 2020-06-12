// Project Imports
import { EventHandler } from './meta/Interface';
import { CommandManager } from '../commands/meta/Manager';
import { Input } from '../common/wrappers/Message';

export class MessageEventHandler implements EventHandler {
    private constructor() { /* Disabled */ };
    // Expects to receive an Input object as parameter
    handle(...ctx: any[]): void {
        CommandManager.executeFirstApplicableCommand(ctx[0] as Input);
    }
}
