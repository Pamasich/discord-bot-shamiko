import { Message } from 'discord.js';

/**
    Send a complementary 'Pong!' message.
*/
export function handleHug(msg: Message): void {
    msg.reply("Pong!");
}
