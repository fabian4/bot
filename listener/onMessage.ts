import {Message} from "wechaty";

export default async function onMessage(msg: Message) {
    if (msg.room()) {
        console.log(`Room: ${await msg.room()!.topic()} Contact: ${msg.talker()!.name()} Text: ${msg.text()}`)
    } else {
        console.log(`Contact: ${msg.talker()!.name()} Text: ${msg.text()}`)
    }
}