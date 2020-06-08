// Node Imports
import { Client } from 'discord.js';
// Project Imports
import { MessageEventHandler } from './event-handlers/Message';
import { ReadyEventHandler } from './event-handlers/Ready';
// Local Imports
import { login } from './Login';

// Used to access the Discord API
const bot: Client = new Client();

// Event Handlers
bot.on('message', msg => MessageEventHandler.prototype.handle(msg));
bot.on('ready', () => ReadyEventHandler.prototype.handle());

// Login
login(bot);
