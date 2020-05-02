import { Client, Message } from 'discord.js';
import { readFileSync } from 'fs';
import { checkForKeyword, stripKeyword} from './CommonFunctions';
import { handleRPS, RPSType } from './commands/RockPaperScissors';
import { handlePing } from './commands/Ping';
import { handleHug } from './commands/Hug';
import { Session } from './sessions/Session';

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
    // If the message's author is the bot itself, don't handle it
    if (msg.author === bot.user) return;
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
        if (checkForKeyword(cmd, 'rock')) {
            handleRPS(msg, RPSType.Rock); return;
        }
        if (/^scissor(s)?$/.test(cmd)) {
            handleRPS(msg, RPSType.Scissors); return;
        }
        if (checkForKeyword(cmd, 'paper')) {
            handleRPS(msg, RPSType.Paper); return;
        }
        // For testing latest functionalities
        if (checkForKeyword(cmd, 'test')) {
            let session: Session = new Session(msg.author, 'test');
            console.log(session.getLastUpdate());
            session.set('some', 'test');
            console.log(session.getLastUpdate());
            console.log(session.get('some'));
            return;
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
