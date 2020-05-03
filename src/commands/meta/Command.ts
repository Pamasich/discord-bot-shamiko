export interface Command {
    readonly name: string,
    readonly desc: string,
    readonly aliases?: string[],
    readonly syntax: string,
    readonly usages: CommandUsage[]
}

export interface CommandUsage {
    readonly usage: string,
    readonly desc: string
}
