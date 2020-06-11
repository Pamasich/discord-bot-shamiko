// Node Imports
import { Message } from 'discord.js';
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
        CommandManager.loadAllCommands();
        CommandManager.executeFirstApplicableCommand('ping', ctx[0] as Message);
    }
}
