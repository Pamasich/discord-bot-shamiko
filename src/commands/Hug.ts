import { Message, User } from 'discord.js';
import { findGuildUserByName, generateUserMention } from '../CommonFunctions';
import { registerCommand } from './meta/CommandManager';

/**
    Hugs a given user, or the command's author if no user is specified.
    When a user is specified, the requesting message will be deleted.
    @param msg The message requesting the hug
    @param user The user to hug
*/
export function handleHug(msg: Message, user: string): void {
    const reply: string = "⊂(・ヮ・⊂)";
    // If no target user is specified or it says 'me' (target is oneself)
    if (!user || user === 'me') {
        msg.reply(reply); return;
    }
    // If the target user is given in plain text, convert it into a mention
    let mention: string | undefined = undefined;
    const isMention: RegExp = /^<@!.+>$/;
    if (!isMention.test(user)) {
        const userFound: User | undefined = findGuildUserByName(user, msg.guild)?.user;
        mention = (userFound) ? generateUserMention(userFound) : undefined;
    }
    // If the target user is given as a mention, or previously converted into one
    if (mention || isMention.test(user)) {
        msg.channel.send((mention ? mention : user) + ", " + reply);
        // Delete the message asking for the hug
        msg.delete();
        return;
    }
    // Default Response
    msg.reply("I've never heard of this person!");
}

registerCommand('hug', {
    name: 'hug',
    desc: "I will hug you or someone else you want me to.",
    syntax: 'hug <target>',
    usages: [
        {usage: 'hug', desc: "I will hug you."},
        {usage: 'hug me', desc: "I will hug you."},
        {usage: 'hug shamiko', desc: "I will hug @Shamiko"},
        {usage: 'hug @shamiko', desc: "I will hug @Shamiko"}
    ]
});
