import { Message, ReactionCollector } from 'discord.js';
import { random, floor } from 'mathjs';
import { getOrCreateSession, deleteSession } from '../sessions/SessionManager';
import { Session } from '../sessions/Session';
import { registerCommand } from './meta/CommandManager';

/**
    Plays Rock Paper Scissors.
    @param msg The message to reply to
    @param input The user's choice
*/
export async function handleRPS(msg: Message, input: RPSType): Promise<void> {
    const randomNum: number = randomRPSType();
    const session: Session = getOrCreateSession(
        'rock-paper-scissors', msg.author, 60
    );
    let answer: string | undefined = undefined;
    // Victory case
    if (
        randomNum === RPSType['Rock'] && input === RPSType.Paper
        || randomNum === RPSType['Paper'] && input === RPSType.Scissors
        || randomNum === RPSType['Scissors'] && input === RPSType.Rock
    ) {
        session.set('turns', session.getNumber('turns')+1);
        session.set('victories', session.getNumber('victories')+1);
        answer = "you beat me... but don't think that means you've won!";
    // Tie case
    } else if (
        randomNum === RPSType['Rock'] && input === RPSType.Rock
        || randomNum === RPSType['Paper'] && input === RPSType.Paper
        || randomNum === RPSType['Scissors'] && input === RPSType.Scissors
    ) {
        session.refresh();
        answer = "it's a tie!"
    // Loss case
    } else {
        session.set('turns', session.getNumber('turns')+1);
        answer = "I won!";
    }
    // Answering
    const reply: Message = await msg.reply(RPSType[randomNum] + ', ' + answer
        + '\n```' // Code formatting start
        + '\nTotal Attempts: ' + session.getNumber('turns')
        + '\nI won:          '
        + (session.getNumber('turns') - session.getNumber('victories'))
        + '\nYou won:        ' + session.getNumber('victories')
        + '\n```' // Code formatting end
    );
    // Add reactions
    await reply.react('🗑️');
    await reply.react('♻️');
    // Wait for user to react
    const collector: ReactionCollector = reply.createReactionCollector(
        (reaction, user) => {
            if (session.user === user) {
                if (
                    reaction.emoji.name === '🗑️'
                    || reaction.emoji.name === '♻️'
                ) {
                    return true;
                }
            }
            return false;
        }
    ).on('collect', reaction => {
        if (reaction.emoji.name === '🗑️') {
            deleteSession(session);
            msg.reply("This demon will do her best to forget all about our"
                + " previous battle results!");
            collector.stop();
        } else if (reaction.emoji.name === '♻️') {
            session.refresh();
            msg.reply("I'll make sure to remember you for another hour!");
        }
    });
}

/** Holds the valid choices the user and shamiko can make. */
export enum RPSType {
    Rock,
    Paper,
    Scissors
}

/** Returns the index of a random RPSType. */
function randomRPSType(): number {
    return floor(random(Object.keys(RPSType).length / 2));
}

// Defined here for readability
const cmdDescStart: string = "Let's play Rock-Paper-Scissors! Your choice is ";
const cmdDescEnd: string = ", but what is mine?\nIf you play again within 60"
    + " minutes, I will remember our previous battles.";
const cmdUsageDesc: string = "I will make my choice and we'll see who wins.";

/**
    Registers a new RPS command.
    @param command The command's name
    @param aliases Any aliases to include
*/
function registerRPSCommand(command: string, aliases?: string[]): void {
    registerCommand(command, {
        name: command,
        desc: cmdDescStart + command + cmdDescEnd,
        aliases: (aliases ? aliases : undefined),
        syntax: command,
        usages: [
            {usage: command, desc: cmdUsageDesc}
        ]
    });
}

// Register the commands
registerRPSCommand('scissors', ['scissor']);
registerRPSCommand('rock');
registerRPSCommand('paper');
