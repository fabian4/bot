import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import {Contact, log, Message, ScanStatus, Wechaty} from 'wechaty';

const puppet = new PuppetPadlocal({
    token: "puppet_padlocal_91a39c6c62db4fee93a847ac0a0a72c0"
})

const bot = new Wechaty({
    name: "ChatBot",
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

async function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting && qrcode) {
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('')
        log.info("ChatBot", `onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
        require('qrcode-terminal').generate(qrcode, {small: true})  // show qrcode on console
    } else {
        log.info("ChatBot", `onScan: ${ScanStatus[status]}(${status})`);
    }
}

async function onLogin(user: Contact) {
    log.info("ChatBot", `${user} login`);
}

async function onLogout(user: Contact, reason: string) {
    log.info("ChatBot", `${user} logout, reason: ${reason}`);
}

async function onError(error: Error) {
    log.error("ChatBot", 'on error: ', error.stack);
}

async function onMessage(msg: Message) {
    log.info("ChatBot", `on message: ${msg.toString()}`);
    // ding-dong bot
    if (msg.to()?.self() && msg.text().indexOf("ding") !== -1) {
        await msg.talker().say(msg.text().replace("ding", "dong"));
    }
}