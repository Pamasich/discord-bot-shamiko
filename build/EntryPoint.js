"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const CommonFunctions_1 = require("./CommonFunctions");
const Ping_1 = require("./commands/Ping");
const Hug_1 = require("./commands/Hug");
const RockPaperScissors_1 = require("./commands/RockPaperScissors");
const bot = new discord_js_1.Client();
bot.on('message', msg => handleMessage(msg));
bot.login(getToken());
function handleMessage(msg) {
    if (CommonFunctions_1.checkForKeyword(msg.content, 'shamiko')) {
        const cmd = CommonFunctions_1.stripKeyword(msg.content, 'shamiko');
        if (!cmd)
            return;
        if (CommonFunctions_1.checkForKeyword(cmd, 'ping')) {
            Ping_1.handlePing(msg);
            return;
        }
        if (CommonFunctions_1.checkForKeyword(cmd, 'hug')) {
            Hug_1.handleHug(msg, CommonFunctions_1.stripKeyword(cmd, 'hug'));
            return;
        }
        if (/^r(ock)?$/.test(cmd)) {
            RockPaperScissors_1.handleRPS(msg, RockPaperScissors_1.RPSType.Rock);
            return;
        }
        if (/^s(cissor(s)?)?$/.test(cmd)) {
            RockPaperScissors_1.handleRPS(msg, RockPaperScissors_1.RPSType.Scissors);
            return;
        }
        if (/^p(aper)?$/.test(cmd)) {
            RockPaperScissors_1.handleRPS(msg, RockPaperScissors_1.RPSType.Paper);
            return;
        }
        msg.reply("I don't understand what you want me to do.");
    }
}
function getToken() {
    return fs_1.readFileSync('./resources/token.txt', 'utf-8').trim();
}
