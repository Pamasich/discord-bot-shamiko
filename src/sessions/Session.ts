import { User } from 'discord.js';
import moment from 'moment';

/**
    Represents an ongoing session, which is associated with a user and a topic.
*/
export class Session {
    private lastUpdate: moment.Moment = moment();
    private ctx: Map<string, any> = new Map();
    /** The user associated with this sesson. */
    readonly user: User;
    /** The topic this session is about. */
    readonly topic: string;
    /** How long (in minutes) the session should stay alive without updates. */
    readonly lifetime: number;

    constructor(user: User, topic: string, lifetime: number) {
        this.user = user;
        this.topic = topic;
        this.lifetime = lifetime;
    }

    /**
        Retrieves the time of when the session got last updated.
        @returns The time
    */
    getLastUpdate(): moment.Moment {
        return this.lastUpdate;
    }

    /**
        Stores a value in the session.
        @param key The key to update/add
        @param value The value to save
    */
    set(key: string, value: any): void {
        this.ctx.set(key, value);
        this.lastUpdate = moment();
    }

    /**
        Retrieves the value of a key.
        @param key The key to retrieve
        @returns The value of the key
    */
    get(key: string): any {
        return this.ctx.get(key);
    }

    /**
        Retrieves the value of a key as a number.
        @param key The key to retrieve
        @returns The value as a number, or 0 if it is undefined
    */
    getNumber(key: string): number {
        if (!this.ctx.get(key)) return 0;
        return this.ctx.get(key) as number;
    }

    /**
        Retrieves the value of a key as a string.
        @param key The key to retrieve
        @returns The value as a string, or an empty string if it is undefined
    */
    getString(key: string): string {
        if (!this.ctx.get(key)) return '';
        return this.ctx.get(key) as string;
    }
}
