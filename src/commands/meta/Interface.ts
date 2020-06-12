// Project Imports
import { Input } from '../../common/wrappers/Message';
// Local Imports
import { CommandManager } from './Manager';

export abstract class Command {

    readonly name: string;
    abstract run(msg: Input): void;

    constructor(name: string, regex: string) {
        this.name = name;
        CommandManager.register(regex, this);
    }
}
