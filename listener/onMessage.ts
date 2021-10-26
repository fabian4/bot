import {Message} from "wechaty";
import {client} from "../util/TencentChat";

export default async function onMessage(msg: Message) {
    if (!msg.room() && msg.talker().name() === "fabian") {
        console.log(`Contact: ${msg.talker()!.name()} Text: ${msg.text()}`)
        // await msg.talker().say()
        const params = {
            "Query": msg.text()
        };
        client.ChatBot(params).then(
            async (data) => {
                const res: string = data.Reply
                await msg.talker().say(res)
            }
        );
    }
}