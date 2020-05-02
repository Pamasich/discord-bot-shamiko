import { User } from 'discord.js';

/**
    Represents an ongoing session, which is associated with a user and a topic.
*/
export class Session {
    private lastUpdate: Date = new Date();
    private ctx: Map<string, string> = new Map();
    readonly user: User;
    readonly topic: string;

    constructor(user: User, topic: string) {
        this.user = user;
        this.topic = topic;
    }

    /**
        Retrieves the timestamp of when the session got last updated.
        @returns The timestamp
    */
    getLastUpdate(): Date {
        return this.lastUpdate;
    }

    /**
        Stores a value in the session.
        @param key The key to update/add
        @param value The value to save
    */
    set(key: string, value: string): void {
        this.ctx.set(key, value);
        this.lastUpdate = new Date();
    }

    /**
        Retrieves the value of a key.
        @param key The key to retrieve
        @returns The value of the key
    */
    get(key: string): string | undefined {
        return this.ctx.get(key);
    }
}
