import { User } from 'discord.js';

export class Session {
    private lastUpdate: Date = new Date();
    private ctx: Map<string, string> = new Map();
    readonly user: User;
    readonly topic: string;

    getLastUpdate(): Date {
        return this.lastUpdate;
    }

    constructor(user: User, topic: string) {
        this.user = user;
        this.topic = topic;
    }

    set(key: string, value: string): void {
        this.ctx.set(key, value);
        this.lastUpdate = new Date();
    }

    get(key: string): string | undefined {
        return this.ctx.get(key);
    }
}
