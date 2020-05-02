"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const bot = new discord_js_1.Client();
bot.on('message', msg => handleMessage(msg));
bot.login(getToken());
function handleMessage(msg) {
    console.log(msg.author);
}
function getToken() {
    return fs_1.readFileSync('./resources/token.txt', 'utf-8').trim();
}
