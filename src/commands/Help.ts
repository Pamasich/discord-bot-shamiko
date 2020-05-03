import {
    registerCommand,
    getCommand,
    getAllCommands
} from './meta/CommandManager';
import { Command, CommandUsage } from './meta/Command';
import { Message, MessageEmbed } from 'discord.js';

/**
    Shows an embed with a list of commands or information about a single
    command.
    @param msg The message requesting help
    @param cmd The message content, with 'shamiko' and 'help' stripped
*/
export function handleHelp(msg: Message, cmd: string): void {
    // If no command has been supplied
    if (!cmd) {
        // Display a list of commands
        msg.reply(buildAllCommandsEmbed());
        return;
    }
    // If a valid command has been supplied
    if (getCommand(cmd)) {
        // Display information about the command
        msg.reply(buildSingleCommandEmbed(cmd));
        return;
    }
    // Default response
    msg.reply("I don't know what that is.");
}

/**
    Creates a base embed with common options already set.
    @returns The embed
*/
function buildBaseEmbed(): MessageEmbed {
    return new MessageEmbed()
        .setAuthor('Shamiko')
        .setFooter('shamiko help <command>');
}

/**
    Creates an embed that displays all commands.
    @returns The embed
*/
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

/**
    Creates an embed that displays information about a single command.
    @param cmdName The name of the command
    @returns The embed, if cmdName is the name or an alias of a known command
*/
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

/**
    Encloses each array item in code tags (`).
    @param items The array
    @returns A variant of the input array where all items are surrounded by
    code tags.
*/
function encloseEachInCodeTags(items: string[]): string[] {
    return items.map(item => '`' + item + '`');
}

/**
    Capitalizes the input.
    @param word What to capitalize
    @returns The input but with the first letter in upper case
*/
function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

// Register the command
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
