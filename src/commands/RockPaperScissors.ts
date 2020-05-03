import { Message } from 'discord.js';
import { random, floor } from 'mathjs';
import { getOrCreateSession } from '../sessions/SessionManager';
import { Session } from '../sessions/Session';
import { registerCommand } from './CommandManager';

/**
    Plays Rock Paper Scissors.
    @param msg The message to reply to
    @param input The user's choice
*/
export function handleRPS(msg: Message, input: RPSType): void {
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
    msg.reply(RPSType[randomNum] + ', ' + answer
        + '\n```' // Code formatting start
        + '\nTotal Attempts: ' + session.getNumber('turns')
        + '\nI won:          '
        + (session.getNumber('turns') - session.getNumber('victories'))
        + '\nYou won:        ' + session.getNumber('victories')
        + '\n```' // Code formatting end
    );
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

const cmdDescStart: string = "Let's play Rock-Paper-Scissors! Your choice is ";
const cmdDescEnd: string = ", but what is mine?\nIf you play again within 60"
    + " minutes, I will remember our previous battles.";
const cmdUsageDesc: string = "I will make my choice and we'll see who wins.";

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

registerRPSCommand('scissors', ['scissor']);
registerRPSCommand('rock');
registerRPSCommand('paper');
