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
