import { Client, Message } from 'discord.js';
import { readFileSync } from 'fs';
import { checkForKeyword, stripKeyword} from './CommonFunctions';
import { handlePing } from './commands/Ping';
import { handleHug } from './commands/Hug';
import { handleRPS, RPSType } from './commands/RockPaperScissors';

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
    // Check if the bot should handle this message
    if (checkForKeyword(msg.content, 'shamiko')) {
        // Removes the keyword from the command
        const cmd: string = stripKeyword(msg.content, 'shamiko');
        // If someone only writes her name, don't respond
        if (!cmd) return;
        // Decide which command to execute
        if (checkForKeyword(cmd, 'ping')) {
            handlePing(msg); return;
        }
        if (checkForKeyword(cmd, 'hug')) {
            handleHug(msg, stripKeyword(cmd, 'hug')); return;
        }
        if (/^r(ock)?$/.test(cmd)) {
            handleRPS(msg, RPSType.Rock); return;
        }
        if (/^s(cissor(s)?)?$/.test(cmd)) {
            handleRPS(msg, RPSType.Scissors); return;
        }
        if (/^p(aper)?$/.test(cmd)) {
            handleRPS(msg, RPSType.Paper); return;
        }
        // Default reply
        msg.reply("I don't understand what you want me to do.");
    }
}

/**
    Retrieves the access token for the bot account.
    @returns The token
*/
function getToken(): string {
    // Make sure this file exists, it isn't checked into source control
    return readFileSync('./resources/token.txt', 'utf-8').trim();
}