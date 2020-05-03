import { User } from 'discord.js';
import { Session } from './Session';
import { abs } from 'mathjs';
import moment from 'moment';

/** Holds all the active sessions. */
let sessions: Session[] = new Array();

/**
    Pushes a new session into the array.
    @param topic What the session is about
    @param user The user associated with the session
    @param lifetime How long, in minutes, the sessions should stay alive
*/
export function createSession(
    topic: string,
    user: User,
    lifetime: number
): void {
    if (getSession(topic, user)) return; // Abort if the session already exists
    sessions.push(new Session(user, topic, lifetime));
}

/**
    Retrieves a session.
    If any expired sessions are found, they are discarded.
    @param topic What the session is about
    @param user The user associated with the session
    @returns The session with the given topic and user
*/
export function getSession(topic: string, user: User): Session | undefined {
    // Filter out any expired sessions
    sessions = sessions.filter(session => {
        return !(
            abs(
                session
                .getLastUpdate()
                .diff(moment(), 'minutes')
            ) > session.lifetime
        );
    });
    // Look for the target session
    return sessions.find(session => {
        return session.user === user && session.topic === topic;
    });
}

/**
    Retrieves a session.
    If it doesn't exist yet, create it.
    If any expired sessions are found, they are discarded.
    @param topic What the session is about
    @param user The user associated with the session
    @param lifetime How long, in minutes, the sessions should stay alive
    @returns The desired session
*/
export function getOrCreateSession(
    topic: string,
    user: User,
    lifetime: number
): Session {
    createSession(topic, user, lifetime);
    return getSession(topic, user) as Session;
}

/**
    Removes a session.
    @param session The session to remove
*/
export function deleteSession(session: Session): void {
    sessions = sessions.filter(item => {
        return item !== session;
    });
}
