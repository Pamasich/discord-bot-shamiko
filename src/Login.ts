// Node Imports
import { readFileSync } from 'fs';
import { Client } from 'discord.js';

// Constants
const tokenPath: string = './resources/token.txt';
const encoding: string = 'utf8';

/**
    Handles logging into the Discord API.
    @param bot The client used to access the API
*/
export function login(bot: Client): void {
    bot.login(readFileSync(tokenPath, encoding).trim());
}
