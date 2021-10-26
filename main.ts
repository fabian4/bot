import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import {log, Wechaty} from 'wechaty';
import config from "./config";
import onScan from "./listener/onScan";
import onLogout from "./listener/onLogout";
import onLogin from "./listener/onLogin";
import onMessage from "./listener/onMessage";
import onError from "./listener/onError";

const puppet = new PuppetPadlocal({
    token: config.WECHATY_PUPPET_SERVICE_TOKEN
})

const bot = new Wechaty({
    name: config.BotName,
    puppet,
})
    .on("scan", onScan)
    .on("login", onLogin)
    .on("logout", onLogout)
    .on("message", onMessage)
    .on("error", onError)

bot.start().then(() => {
    log.info("ChatBot", "started.");
});