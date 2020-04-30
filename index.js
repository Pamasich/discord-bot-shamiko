const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', msg => {
    const msgParts = msg.content
                        .split(' ')
                        .map(cmd => cmd.toLowerCase());

    if (msgParts[0] === 'shamiko') {
        switch (msgParts[1]) {
            case 'ping':
                msg.reply('Pong!');
                break;
            default:
        }
    }
});

bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
