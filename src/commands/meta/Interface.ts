// Project Imports
import { Input } from '../../common/wrappers/Message';
// Local Imports
import { CommandManager } from './Manager';

export abstract class Command {

    readonly name: string;
    readonly desc: string;
    readonly regex: string;
    readonly syntax?: string;
    readonly aliases?: string[];
    readonly usages?: UsageExample[];
    // To hide dev commands
    readonly showInHelp: boolean;
    // To enable adding additional topics like a regex explanation
    readonly helpOnly: boolean;

    abstract run(msg: Input): void;

    constructor(
        name: string, desc: string, regex: string,
        optionalParams?: OptionalCommandParams
    ) {
        this.name = name;
        this.desc = desc;
        this.regex = regex;
        if (optionalParams?.syntax) this.syntax = optionalParams?.syntax;
        if (optionalParams?.aliases) this.aliases = optionalParams?.aliases;
        if (optionalParams?.usages) this.usages = optionalParams?.usages;
        this.helpOnly = (optionalParams?.helpOnly)
            ? optionalParams.helpOnly : false;
        // If helpOnly is true, showInHelp should be true too
        if (optionalParams?.showInHelp === false && !this.helpOnly) {
            this.showInHelp = false;
        } else { this.showInHelp = true; }
        CommandManager.register(regex, this);
    }
}

export interface UsageExample {
    usage: string;
    desc: string;
}

export interface OptionalCommandParams {
    syntax?: string;
    aliases?: string[];
    usages?: UsageExample[];
    showInHelp?: boolean;
    helpOnly?: boolean;
}
