import {log, Message} from "wechaty";
import {client} from "../util/TencentChat";

export default async function onMessage(msg: Message) {
    if (!msg.room() && !msg.self() && msg.talker().friend()) {
        log.info("ChatBot", `received ======>  Contact: ${msg.talker()!.name()} ---- Text: ${msg.text()}`)
        const params = {
            "Query": msg.text()
        };
        client.ChatBot(params).then(
            (data) => {
                msg.talker().say(data.Reply || "")
                log.info("ChatBot", `sent ======>  Contact: ${msg.talker()!.name()} ---- Text: ${data.Reply}`)
            }
        );
    }
}