const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', msg => {
    const msgParts = msg.content
                        .split(' ')
                        .map(cmd => cmd.toLowerCase());

    msgParts.initial = function () {
        this.current = 0;
        return this[this.current];
    }
    msgParts.next = function () {return this[++this.current];}

    if (msgParts.initial() === 'shamiko') {
        switch (msgParts.next()) {
            case 'ping':
                msg.reply('Pong!');
                break;
            default:
        }
    }
});

bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
