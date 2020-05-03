import { Message } from 'discord.js';
import { registerCommand } from './CommandManager';

/**
    Send a complementary 'Pong!' message.
    @param msg The pinging message
*/
export function handlePing(msg: Message): void {
    msg.channel.send("Pong!");
}

registerCommand('ping', {
    name: 'ping',
    desc: "I will answer you with a Pong!",
    syntax: 'ping',
    usages: [
        {usage: 'ping', desc: "I will answer with Pong!"}
    ]
});
