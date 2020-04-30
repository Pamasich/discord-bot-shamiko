const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', msg => {
    if (msg.author.bot) return;
    switch (msg.content.toLowerCase()) {
        case 'ping':
            msg.reply('Pong!');
            break;
        default:
    }
});

bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
