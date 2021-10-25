import { PuppetPadlocal } from "wechaty-puppet-padlocal";
import { Contact, log, Message, ScanStatus, Wechaty } from 'wechaty';

// log.level("silly");

const puppet = new PuppetPadlocal({
    token: "puppet_padlocal_91a39c6c62db4fee93a847ac0a0a72c0"
})

const bot = new Wechaty({
    name: "TestBot",
    puppet,
})

    .on("scan", (qrcode: string, status: ScanStatus) => {
        if (status === ScanStatus.Waiting && qrcode) {
            const qrcodeImageUrl = [
                'https://wechaty.js.org/qrcode/',
                encodeURIComponent(qrcode),
            ].join('')

            log.info("TestBot", `onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);

            require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
        } else {
            log.info("TestBot", `onScan: ${ScanStatus[status]}(${status})`);
        }
    })

    .on("login", (user: Contact) => {
        log.info("TestBot", `${user} login`);
    })

    .on("logout", (user: Contact, reason: string) => {
        log.info("TestBot", `${user} logout, reason: ${reason}`);
    })

    .on("message", onMessage)

    .on("error", (error) => {
        log.error("TestBot", 'on error: ', error.stack);
    })


bot.start().then(() => {
    log.info("TestBot", "started.");
});


async function onMessage(msg: Message){
    log.info("TestBot", `on message: ${msg.toString()}`);
    // ding-dong bot
    if (msg.to()?.self() && msg.text().indexOf("ding") !== -1) {
        await msg.talker().say(msg.text().replace("ding", "dong"));
    }
}