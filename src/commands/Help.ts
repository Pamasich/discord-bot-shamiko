import {
    registerCommand,
    getCommand,
    getAllCommands
} from './meta/CommandManager';
import { Command, CommandUsage } from './meta/Command';
import { Message, MessageEmbed } from 'discord.js';

export function handleHelp(msg: Message, cmd: string) {
    if (!cmd) {
        msg.reply(buildAllCommandsEmbed());
        return;
    }
    if (getCommand(cmd)) {
        msg.reply(buildSingleCommandEmbed(cmd));
        return;
    }
    msg.reply("I don't know what that is.");
}

function buildBaseEmbed(): MessageEmbed {
    return new MessageEmbed()
        .setAuthor('Shamiko')
        .setFooter('shamiko help <command>');
}

function buildAllCommandsEmbed(): MessageEmbed {
    return buildBaseEmbed()
        .setTitle('Command Help - Overview')
        .setDescription("I'll tell you what I can do! Just ask me again"
            + " and include one of the following commands this time!")
        .addField('All Commands',
            encloseEachInCodeTags(
                getAllCommands()
                    .map(cmd => cmd.name)
            ).join(' ')
        );
}

function buildSingleCommandEmbed(cmdName: string): MessageEmbed | undefined {
    const cmd: Command | undefined = getCommand(cmdName);
    return (cmd)
        ? buildBaseEmbed()
            .setTitle('Command Help - ' + capitalize(cmdName))
            .setDescription(cmd.desc)
            .addField(
                'Aliases'
                , (cmd.aliases
                    ? encloseEachInCodeTags(cmd.aliases).join(' ')
                    : 'None')
                , true
            )
            .addField('Syntax', cmd.syntax, true)
            .addField('Usages', cmd.usages.map(usage => {
                return '`' + usage.usage + '` ' + usage.desc;
            }).join('\n'))
        : undefined;
}

function encloseEachInCodeTags(items: string[]): string[] {
    return items.map(item => '`' + item + '`');
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

registerCommand('help', {
    name: 'help',
    desc: "I'll tell you what I can do. I'll repeat myself as often as you "
        + "need me to!"
        + "\nYou can also give me a group or command and I'll tell you more"
        + " about it!",
    syntax: 'help <command>',
    usages: [
        {usage: 'help', desc: "I will give you a list of commands."},
        {usage: 'help hug', desc: "I will tell you all about the hug command."}
    ]
});
