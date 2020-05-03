/**
    Represents a command the user can use.
*/
export interface Command {
    /** What the user has to enter. */
    readonly name: string,
    /** What the command does. */
    readonly desc: string,
    /** Other names the command goes by / can be called with. */
    readonly aliases?: string[],
    /**
        How to use the command.
        Use '<>' for optional parameters and '[]' for required ones.
    */
    readonly syntax: string,
    /** Examples of how the command can be used. */
    readonly usages: CommandUsage[]
}

/**
    Represents a usage example of a command.
*/
export interface CommandUsage {
    /** How the full command looks. */
    readonly usage: string,
    /** What the usage does. */
    readonly desc: string
}
