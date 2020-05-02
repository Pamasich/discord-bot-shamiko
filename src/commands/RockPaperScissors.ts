import { Message } from 'discord.js';
import { random, floor } from 'mathjs';

/**
    Plays Rock Paper Scissors.
    @param msg The message to reply to
    @param input The user's choice
*/
export function handleRPS(msg: Message, input: RPSType): void {
    const randomNum: number = randomRPSType();
    let answer: string | undefined = undefined;
    // Victory case
    if (
        randomNum === RPSType['Rock'] && input === RPSType.Paper
        || randomNum === RPSType['Paper'] && input === RPSType.Scissors
        || randomNum === RPSType['Scissors'] && input === RPSType.Rock
    ) {
        answer = "you beat me... but don't think that means you've won!";
    // Tie case
    } else if (
        randomNum === RPSType['Rock'] && input === RPSType.Rock
        || randomNum === RPSType['Paper'] && input === RPSType.Paper
        || randomNum === RPSType['Scissors'] && input === RPSType.Scissors
    ) {
        answer = "it's a tie!"
    // Loss case
    } else {
        answer = "I won!";
    }
    // Answering
    msg.reply(RPSType[randomNum] + ', ' + answer);
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
