const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', msg => {
    const msgParts = msg.content.split(" ");
    if (msgParts[0].toLowerCase() === 'shamiko') {
        switch (msgParts[1].toLowerCase()) {
            case 'ping':
                msg.reply('Pong!');
                break;
            default:
        }
    }
});

bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
