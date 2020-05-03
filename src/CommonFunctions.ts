import { Guild, GuildMember, User } from 'discord.js';

/**
    Checks if the supplied string starts with the expected keyword.
    @param cmd The command to check
    @param keyword What the command is expected to start with
    @returns 'true' if cmd starts with keyword, 'false' if it doesn't
*/
export function checkForKeyword(cmd: string, keyword: string): boolean {
    return cmd.toLowerCase().startsWith(keyword);
}

/**
    Strips a given keyword from the supplied command string.
    @param cmd The command to remove the keyword from
    @param keyword The keyword to remove
    @return The cmd parameter without leading keyword and spaces
*/
export function stripKeyword(cmd: string, keyword: string): string {
    if (!checkForKeyword(cmd, keyword)) return cmd;
    return cmd.substr(keyword.length).trim();
}

/**
    Checks whether the given string matches the name of any member of the
    given guild, and if yes, returns the member.
    @param user The name of a user in plain text
    @param guild The guild to check in
    @returns The guild member with the specified name, or undefined if there is none
*/
export function findGuildUserByName(
    user: string,
    guild: Guild | undefined | null
): GuildMember | undefined {
    if (!guild) return;
    return getGuildMembersAsArray(guild).find((item: GuildMember) => {
        return item.nickname?.toLowerCase() == user.toLowerCase()
            || item.user.username.toLowerCase() === user.toLowerCase();
    });
}

/**
    Creates a user mention to be used in messages.
    @param user The user to mention
    @returns A mention
*/
export function generateUserMention(user: User): string {
    return '<@!' + user.id + '>';
}

/**
    Retrieves the members of a given guild as an array.
    @param guild The guild
    @returns The guild's members as an array
*/
function getGuildMembersAsArray(guild: Guild): Array<GuildMember> {
    return Array.from(guild.members.cache.values());
}
