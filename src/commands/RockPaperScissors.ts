import { Message } from 'discord.js';
import { random, floor } from 'mathjs';
import { getOrCreateSession } from '../sessions/SessionManager';
import { Session } from '../sessions/Session';

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
