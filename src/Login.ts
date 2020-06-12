// Node Imports
import { readFileSync } from 'fs';
import { Client } from 'discord.js';

// Constants
const tokenPath: string = './resources/token.txt';
const encoding: string = 'utf8';

// The parameter is the client used to access the API
export function login(bot: Client): void {
    bot.login(readFileSync(tokenPath, encoding).trim());
}
