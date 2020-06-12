export interface EventHandler {
    // ctx is any number of any arguments that may be given by the event
    // it is defined like this to ensure maximal compatibility with any event
    handle(...ctx: any[]): void
}
