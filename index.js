// Imports
const Discord = require('discord.js');

// Objects
const bot = new Discord.Client();

// Message Event Handler
bot.on('message', msg => {
    /*  The message is expected to consist of a series of commands,
        so we start off by splitting them into those individual commands.
        They are also mapped to lowercase to simplify later comparisons.  */
    const msgParts = msg.content
                        .split(' ')
                        .map(cmd => cmd.toLowerCase());

    /*  These two functions are meant to give the array some iterator
        capabilities. The 'initial' function should be called to get the
        first element, while the 'next' function returns the next element
        in the array and moves the 'current' counter accordingly.         */
    msgParts.initial = function () {
        this.current = 0;
        return this[this.current];
    }
    msgParts.next = function () {return this[++this.current];}

    /*  Here the main logic happens.
        The 'shamiko' command is where it all begins, Shamiko only
        listens when her name is called!
        The regex allows for a comma to follow her name, to better
        distinguish the main command from the later ones.           */
    if (/^shamiko,?$/.test(msgParts.initial())) {
        /*  These are the main functionality commands.
            Further sub-commands can be used to fine-tune functionality. */
        switch (msgParts.next()) {
            // TODO: Test command, remove later
            case 'ping':
                msg.reply('Pong!');
                break;
            default:
        }
    }
});

/*  The bot's token, needed to identify it.
    Can be found in the Developer Portal.   */
bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
