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
    const finish = () => msg.delete();
    const stripCommandsFromMsg = (amount) => {
        return msg.content.split(' ').splice(amount).join(' ');
    }

    if (cmds.length >= 4) {
        // Only do this stuff if the argument string is more than one word long
        target = cmds.next(); // The target of the message
        // Remove the 'shamiko', 'tell' and the target
        msgToSend = stripCommandsFromMsg(3);
        if (target === '-') {
            // If a - is used, just say it normally.
            msg.channel.send(msgToSend);
        } else if (target.startsWith('<@')) {
            // If target is a mention, add a comma after it.
            msg.channel.send(target + ', ' + msgToSend);
        } else if (target === 'me') {
            // If target is 'me', reply to the message.
            msg.reply(msgToSend);
        } else if (getUserByName(target, msg.guild)) {
            const mention = '<@' + getUserByName(target, msg.guild).id + '>';
            msg.channel.send(mention + ', ' + msgToSend);
        } else {
            msg.channel.send(stripCommandsFromMsg(2));
        }
        finish();
    } else if (cmds.length == 3) {
        // Alternatively do this if the argument string is just one word
        msg.channel.send(stripCommandsFromMsg(2));
        finish();
    } else {
        // No argument string has been supplied
        msg.reply("I'm not sure what you want me to say.");
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
    group: CommandGroupEnum.INFORMATIONAL,
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
        return Object.values(CommandGroupEnum).find((item) => {
            return item.toLowerCase() == ctx;
        });
    }
    const tooManyArgsError = () => {
        msg.reply("you gave too many arguments and overloaded this poor"
            + " demon's brain!");
    }
    const buildBaseHelpEmbed = () => {
        return new Discord.MessageEmbed()
            .setAuthor('Shamiko')
            .setFooter('shamiko help <command|group>');
    }
    const generateInlineCodeList = (arr) => {
        return arr.map((item) => '`' + item + '`').join(' ');
    }
    const getCommandGroups = () => {
        return generateInlineCodeList(
            Object.values(CommandGroupEnum)
                .filter((item) => item !== CommandGroupEnum.PRIVATE));
    }
    const getCommandsFor = (group) => {
        return generateInlineCodeList(Array.from(commandMap.keys())
            .filter((key) => commandMap.get(key).group === group));
    }
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
    const buildGroupEmbed = (group) => {
        return buildBaseHelpEmbed()
            .setTitle('Command Help - ' + capitalize(group) + ' Group')
            .setDescription("I'll tell you what I can do! Just ask me again"
                + " and include one of the following commands this time!")
            .addField('Commands', getCommandsFor(group));
    }
    const buildGroupsEmbed = () => {
        return buildBaseHelpEmbed()
            .setTitle('Command Help - Groups')
            .setDescription("I'll tell you what I can do! Just ask me again and"
                + " include a command this time! You can also use one of the"
                + " following command groups if you want me to tell you a list"
                + " of commands.")
            .addField('Command Groups', getCommandGroups());
    }
    const combineUsages = (usagesArr) => {
        return usagesArr
            .map((usage) => '`' + usage.usage + '` ' + usage.desc)
            .join('\n');
    }
    const buildCommandEmbed = (command) => {
        commandObject = commandMap.get(command);
        return buildBaseHelpEmbed()
            .setTitle('Command Help - ' + capitalize(command))
            .setDescription(commandObject.desc)
            .addField('Aliases', (commandObject.aliases.length != 0)
                ? generateInlineCodeList(commandObject.aliases)
                : 'None', true)
            .addField('Syntax', "`" + commandObject.syntax + "`", true)
            .addField('Group', "`" + commandObject.group + "`", true)
            .addField('Usages', combineUsages(commandObject.usages));
    }

    const syntaxExplanation = '`[]` - replace this\n`<>` - optional';

    // Only 'shamiko' and 'help' have been given
    if (cmds.length == 2) {
        msg.channel.send(buildGroupsEmbed());
    } else if (cmds.length == 3) { // A context has been given
        const ctx = cmds.next(); // The context to display
        if (checkIfCommandGroup(ctx)) {
            msg.channel.send(buildGroupEmbed(ctx));
        } else if (commandMap.get(ctx)) { // Check if the context is a command
            msg.channel.send(buildCommandEmbed(ctx));
        } else {
            tooManyArgsError();
        }
    } else {
        tooManyArgsError();
    }
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
        + " my best at.",
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
