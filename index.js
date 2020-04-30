// Imports
const Discord = require('discord.js');

// Objects
const bot = new Discord.Client();

// Map of commands and their help page information
const commandMap = new Map();

//------------------------
// Enums

// Available command groups
const CommandGroupEnum = {
    FUN: 'fun',
    MUSIC: 'music',
    MEDIA: 'media',
    MODERATION: 'moderation',
    PRIVATE: 'private',
    INFORMATIONAL: 'informational'
}

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
                help(cmds, msg);
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
commandMap.set('tell', {
    desc: "Makes me say something.\nYou can include a target user if you want,"
        + " I will mention them in my message. If your message starts with a"
        + " username, but you don't want me to mention them, use a `-` as seen"
        + " in the example!"
        + "\nOnce I'm done, I will delete your message.",
    aliases: ['say'],
    group: CommandGroupEnum.FUN,
    syntax: 'tell <target> [message]',
    usages: [
        {usage: 'tell something', desc: "I will say 'something'."},
        {usage: 'tell me something', desc: "I will tell you 'something'."},
        {
            usage: 'tell @Shamiko something',
            desc: "I will mention @Shamiko and tell them 'something'."
        },
        {
            usage: 'tell shamiko something',
            desc: "I will mention @Shamiko and tell them 'something'."
        },
        {
            usage: 'tell - shamiko something',
            desc: "I will say 'shamiko something'."
        }
    ]
});

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
commandMap.set('info', {
    desc: "You want to know something?"
        + "I'll gladly tell you if I know about it!",
    aliases: [],
    group: CommandGroupEnum.INFORMATION,
    syntax: 'info [topic]',
    usages: [
        {usage: 'info shamiko', desc: "I will tell you about myself."},
        {usage: 'info commands', desc: "I will tell you what I can do."}
    ]
});

/**
    Displays a list of commands the bot knows about.
    @param {string[]} cmds The message content, split by words.
    @param {Message} msg The Message object used to reply
*/
const help = function(cmds, msg) {
    const checkIfCommandGroup = (ctx) => {
        return Array.from(Object.values(CommandGroupEnum)).find((item) => {
            return item.toLowerCase() == ctx;
        });
    }
    const tooManyArgsError = () => {
        msg.reply("you gave too many arguments and overloaded this poor"
            + " demon's brain!");
    }

    // Only 'shamiko' and 'help' have been given
    if (cmds.length == 2) {
        // display general help
    } else if (cmds.length == 3) { // A context has been given
        const ctx = cmds.next(); // The context to display
        if (checkIfCommandGroup(ctx)) {
            // show command group embed for ctx
        } else if (commandMap.get(ctx)) { // Check if the context is a command
            // show command embed for ctx
        } else {
            tooManyArgsError();
        }
    } else {
        tooManyArgsError();
    }
    /*msg.reply("Thanks for using me, I'll do my best!"
        + "\nI'm not a very knowledgeable demon, but this is what I know"
            + " how to do:"
        + "\n ● help: I'll tell you what I can do. I'll repeat myself as often"
            + " as you need me to!"
        + "\n ● info [keyword]: You want to know something? I'll gladly tell"
            + " you if I know about it!"
        + "\n ● ganbare <topic>: Tells me to give it my best. You may"
            + " optionally include what I should do my best at."
        + "\n ● tell <target> [message]: Makes me say something. Optionally"
            + " I can tell the message to a target user, just tell me their"
            + " name! If you want to start a message with a name but don't"
            + " want me to mention them, use a ' - ' before the name."
        + "\n\nIf you want me to do something, just say my name!");*/
}
commandMap.set('help', {
    desc: "I'll tell you what I can do. I'll repeat myself as often"
        + " as you need me to!"
        + "\nYou can also give me a group or command and I'll tell you more"
        + " about it!",
    aliases: ['commands'],
    group: CommandGroupEnum.INFORMATIONAL,
    syntax: 'help <group|command>',
    usages: [
        {
            usage: 'help',
            desc: "I will list the groups of commands I know about."
        },
        {
            usage: 'help fun',
            desc: "I will list the commands of the 'fun' group I know about."
        },
        {
            usage: 'help tell',
            desc: "I will tell you about the 'tell' command."
        }
    ]
});

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
commandMap.set('ganbare', {
    desc: "Tells me to do my best. Optionally may include what I should give"
        + "my best at.",
    aliases: [],
    group: CommandGroupEnum.FUN,
    syntax: 'ganbare <topic>',
    usages: [
        {
            usage: 'ganbare',
            desc: "I will show that I have received the command and henceforth"
                + " give my best!"
        },
        {
            usage: 'ganbare become a demon that can kiss her nemesis',
            desc: "I will show that I have received the command and henceforth"
                + " give my best so I one day become a demon that can kiss her"
                + " nemesis."
        }
    ]
});

// Login to the bot's account.
bot.login(getToken());
