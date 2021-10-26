import {log, Message} from "wechaty";
import botConfig from "../config";

export default async function WhoIsTreater(isGame: boolean, msg: Message) {
    if (!isGame || !msg.room()) {
        return
    }
    if (await msg.room()?.topic() != "大家一起喝橙汁") {
        return;
    }
    log.info(botConfig.BotName, `received <======  Room: ${msg.room()?.topic()} ---- Contact: ${msg.talker()!.name()} ---- Text: ${msg.text()}`)
    const contactList = await msg.room()?.memberAll() || []
    for (let i = 0; i <contactList.length; i++) {
        console.log(`id: ${contactList[i].id} name: ${contactList[i]}`)
        if(contactList[i]==msg.talker()){
            console.log("=================")
        }
    }
}