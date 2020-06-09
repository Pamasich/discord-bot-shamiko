// Node Imports
import { Message } from 'discord.js';
// Project Imports
import { CommandManager } from './Manager';

/**
    A command's skeleton. Individual commands extend this class.
*/
export abstract class Command {
    /** The command's name. */
    readonly name: string;

    /**
        Runs the command. Has to be implemented by each command on its own.
        @param msg The incoming Message object
    */
    abstract run(msg: Message): void;

    constructor(name: string, regex: string) {
        this.name = name;
        CommandManager.register(regex, this);
    }
}
