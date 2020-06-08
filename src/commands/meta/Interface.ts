// Node Imports
import { Message } from 'discord.js';

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
    /** Register the command with the CommandManager. */
    register(): void {
        console.log('Register for Help functionality');
    }

    constructor(name: string) {
        this.name = name;
    }
}
