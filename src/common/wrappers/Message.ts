// Node Imports
import { Message, TextChannel } from 'discord.js';

// Contains all the same members as Message, but allows to add custom methods
export class Input extends Message {
    sendReply(msg: string, doMention: boolean = true): void {
        const mention = (doMention) ? `<@${this.author.id}> ` : '';
        this.channel.send(`${mention}${msg}`);
    }
    constructor(wrapped: Message) {
        // necessary
        super(
            wrapped.client,
            wrapped.client as object,
            wrapped.channel as TextChannel
        );
        // copy over all values from the wrapped object
        Object.entries(wrapped) // do not change the "this as any"
            .forEach(([key, value]) => (this as any)[key] = value);
    }
}
