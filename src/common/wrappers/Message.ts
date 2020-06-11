import { Message } from 'discord.js';
import { TextChannel } from 'discord.js';

export class Input extends Message {
    sendReply(msg: string, doMention: boolean = true): void {
        const mention = (doMention) ? '<@' + this.author.id + '>' : '';
        this.channel.send(mention + ' ' + msg);
    }
    constructor(wrapped: Message) {
        super(wrapped.client, wrapped.client as object, wrapped.channel as TextChannel);
        Object.entries(wrapped)
            .forEach(([key, value]) => (this as any)[key] = value);
    }
}
