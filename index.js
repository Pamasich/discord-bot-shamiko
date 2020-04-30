// Imports
const Discord = require('discord.js');

// Objects
const bot = new Discord.Client();

//------------------------
// Bot Event Handlers

bot.on('message', msg => {
    if (msg.author === bot.user) return;

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
                msg.delete();
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

/**
    Retrieves the login token from a file in the same directory as this one.
    @returns {string} The token
*/
const getToken = function() {
    fs = require('fs');
    return token = fs.readFileSync('./token.txt', 'utf-8').trim();
}

/**
    Removes a specified amount of words from a given string.
    @param {string} str The string to remove the words from
    @param {number} amount How many words to remove
    @returns {string} The input string with the first words removed
*/
const removeWordsFromStart = function(str, amount) {
    return str.split(' ').splice(amount).join(' ');
}

/**
    Retrieves a server member based on its username.
    Also returns true if the string matches a user's nickname.
    @param {string} str The username to look for
    @param {Guild} server The current Discord server
    @returns {User} The user with the given username
*/
const getUserByName = function(str, server) {
    return Array.from(server.members.cache.values()).find((item) => {
        return item.nickname?.toLowerCase() == str
            || item.user.username.toLowerCase() === str;
    });
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
    // Checks if there is an argument specifying what to say
    if (nextArg) {
        // Checks if there's a target given
        if (cmds.length >= 4) {
            if (nextArg !== '-') {
                // If target is a mention, add a comma after it.
                if (nextArg.startsWith('<@')) {
                    msg.channel.send(nextArg + ', '
                        + removeWordsFromStart(msg.content, 3));
                    return;
                }
                // If target is 'me', reply to the message.
                if (nextArg === 'me') {
                    msg.reply(removeWordsFromStart(msg.content, 3));
                    return;
                }
                // If target is a username, generate a mention for it.                               */
                if (getUserByName(nextArg, msg.guild)) {
                    const mention =
                        '<@' + getUserByName(nextArg, msg.guild).id + '>';
                    msg.channel.send(mention + ', '
                        + removeWordsFromStart(msg.content, 3));
                    return;
                }
            } else {
                msg.channel.send(removeWordsFromStart(msg.content, 3));
                return;
            }
        }
        // By default, just send the message as given.
        msg.channel.send(removeWordsFromStart(msg.content, 2));
    }
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
        + "\n ● ganbare <topic>: Tells me to give it my best. You may"
            + " optionally include what I should do my best at."
        + "\n ● tell <user> [message]: Makes me say something. Optionally a"
            + " I can tell the message to a specific user, just tell me their"
            + " name!"
        + "\n\nIf you want me to do something, just say my name!");
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

// Login to the bot's account.
bot.login(getToken());
