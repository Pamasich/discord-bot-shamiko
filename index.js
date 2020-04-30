// Imports
const Discord = require('discord.js');

// Objects
const bot = new Discord.Client();

/*
    TODO: Say command
    TODO: Organic mode
    TODO: Ganbare command
    TODO: Typescript
    TODO: Hug command
    TODO: Remove hardcoded numbers
    TODO: Github
*/

//------------------------
// Bot Event Handlers

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

    handleCommands(msgParts, msg);
});

//-------------
// Functions

/**
    The function that handles the main functionality commands.
    @param {string[]} cmds The message content, split by words.
    @param {Message} msg The Message object used to reply
*/
const handleCommands = function (cmds, msg) {
    /*  "shamiko" is the entry point for the bot, Shamiko only listens
        when her name is called.
        The regex allows for a comma to follow her name, to better
        distinguish the main command from the later ones.               */
    if (/^shamiko,?$/.test(cmds.initial())) {
        /*  These are the available commands.
            Each command is in its own function defined further down. */
        switch (cmds.next()) {
            case 'tell':
            case 'say':
                tell(cmds, msg);
                break;
            case 'info':
                info(cmds, msg);
                break;
            case 'commands':
            case 'help':
                help(msg);
                break;
            case 'ganbare':
                ganbare(msg,
                    (cmds.length >= 3) ? cmds.splice(2,).join(' ') : null);
                break;
            default:
                msg.reply("I don't understand what you want me to do.");
        }
    }
}

//-------------
// Commands

/**
    Makes the bot say something. May include a user's name, in which case
    the bot will mention that user.
    @param {string[]} cmds The message content, split by words.
    @param {Message} msg The Message object used to reply
*/
const tell = function (cmds, msg) {
    const nextArg = cmds.next();
    // Check for mentions right after the command, and add a comma if it exists.
    if (nextArg !== undefined && nextArg.startsWith('<@') && cmds.length >= 4) {
        msg.channel.send(nextArg
            + ', ' + msg.content.split(' ').splice(3,).join(' '));
        return;
    }
    // By default, just send the message as given.
    msg.channel.send(msg.content.split(' ').splice(2,).join(' '));
}

/**
    Returns information regarding a specified topic.
    @param {string[]} cmds The message content, split by words.
    @param {Message} msg The Message object used to reply
*/
const info = function (cmds, msg) {
    switch (cmds.next()) {
        case 'commands':
            help(msg);
            break;
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
            msg.reply("That's where my dad lives.");
            break;
        default:
            msg.reply("I'm not a very knowledgeable demon.");
    }
}

/**
    Displays a list of commands the bot knows about.
    @param {Message} msg The Message object used to reply
*/
const help = function(msg) {
    msg.reply("Thanks for using me, I'll do my best!"
        + "\nI'm not a very knowledgeable demon, but this is what I know"
            + " how to do:"
        + "\n ● help: I'll tell you what I can do. I'll repeat myself as often"
            + " as you need me to!"
        + "\n ● info [keyword]: You want to know something? I'll gladly tell"
            + " you if I know about it!"
        + "\nIf you want me to do something, just say my name!");
}

/**
    Makes Shamiko say she's going to give her her best.
    @param {Message} msg The Message object used to reply
    @param {string} topic What she should give her best at
*/
const ganbare = function(msg, topic) {
    let reply = "Yes, I'll give it my all";
    if (topic !== null) reply = reply + " and " + topic;
    msg.reply(reply + "!");
}

/*  The bot's token, needed to identify it.
    Can be found in the Developer Portal.   */
bot.login('NzA1MjAzMDA1MzEzNzc3Nzk2.XqoSCw.i5fufSus3kRazOgb7l5sgvL1xgM');
