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
            // Returns information regarding a specified topic.
            case 'tell':
            case 'info':
                switch (msgParts.next()) {
                    // Joke cases
                    case 'yourself':
                    case 'shamiko':
                        msg.reply("I'm your friendly neighborhood demon.");
                        break;
                    case 'momo':
                    case 'nemesis':
                        msg.reply("Momo is my nemesis and she's really cool.");
                        break;
                    case 'ancestor':
                    case 'gosenzo':
                        msg.reply("My ancestor is very cool, "
                            + "though a bit lewd.");
                        break;
                    case 'mikan':
                    case 'tangerine':
                    case 'orange':
                        msg.reply("Mikan really likes tangerines.");
                        break;
                    case 'winstreak':
                        msg.reply("D..D..Don't think that means she has won!");
                        break;
                    case 'box':
                        msg.reply("Ah, that's where my dad lives.");
                        break;
                    default:
                        msg.reply("I'm not a very knowledgeable demon.");
                }
                break;
            default:
                msg.reply("I don't understand what you want me to do.");
        }
    }
});

/*  The bot's token, needed to identify it.
    Can be found in the Developer Portal.   */
bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
