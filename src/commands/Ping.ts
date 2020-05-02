import { Message } from 'discord.js';

/**
    Send a complementary 'Pong!' message.
*/
export function handlePing(msg: Message): void {
    msg.channel.send("Pong!");
}
