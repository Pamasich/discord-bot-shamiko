import { Client, Message } from 'discord.js';
import { readFileSync } from 'fs';

// The main object used to talk to Discord
const bot: Client = new Client();

// Handles new messages
bot.on('message', msg => handleMessage(msg));

// Login to the bot
bot.login(getToken());

/**
    Defines what happens on new messages.
    @param msg - The new message
*/
function handleMessage(msg: Message): void {
    console.log(msg.author);
}

/**
    Retrieves the access token for the bot account.
    @returns The token
*/
function getToken(): string {
    // Make sure this file exists, it isn't checked into source control
    return readFileSync('./resources/token.txt', 'utf-8').trim();
}
