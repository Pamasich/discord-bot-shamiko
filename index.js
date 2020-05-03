

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
