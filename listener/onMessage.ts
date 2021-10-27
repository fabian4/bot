import {log, Message, Room} from "wechaty";
import {client} from "../util/TencentChat";
import {ContactType} from "wechaty-puppet";
import botConfig from "../config";
import start from "../game/WhoIsTreater";

const config = {
    isGame: true,
    isAutoChat: false
}

export default async function onMessage(msg: Message) {
    // 过滤表情包
    if (msg.text().length > 50) {
        return
    }

    // admin控制
    changeConfig(msg)

    // 腾讯闲聊
    autoChat(config.isAutoChat, msg)

    // 谁是卧底
    WhoIsTreater(config.isGame, msg)
}

function changeConfig(msg: Message) {
    if (msg.talker().id === botConfig.adminId) {
        if (msg.text() === "config") {
            msg.talker().say(`isGame: ${config.isGame}\nisAutoChat: ${config.isAutoChat}`)
        } else if (msg.text() === "game") {
            config.isGame = !config.isGame
            msg.talker().say(`配置成功 ==> isGame: ${config.isGame}`)
        } else if (msg.text() === "chat") {
            config.isAutoChat = !config.isAutoChat
            msg.talker().say(`配置成功 ==> isAutoChat: ${config.isAutoChat}`)
        }
    }
}

function autoChat(isAutoChat: boolean, msg: Message) {
    if (!isAutoChat || msg.talker().id === botConfig.adminId || msg.talker().id === "wxid_a5x323bdh6pq22") {
        return
    }
    if (!msg.room() && !msg.self() && msg.talker().type() === ContactType.Individual) {
        log.info(botConfig.BotName, `received <======  Contact: ${msg.talker()!.name()} ---- Text: ${msg.text()}`)
        const params = {
            "Query": msg.text()
        };
        client.ChatBot(params).then(
            (data) => {
                msg.talker().say(data.Reply || "")
                log.info(botConfig.BotName, `sent ======>  Contact: ${msg.talker()!.name()} ---- Text: ${data.Reply}`)
            }
        );
    }
}

async function WhoIsTreater(isGame: boolean, msg: Message) {
    if (!isGame || !msg.room()) {
        return
    }
    let room: Room = msg.room()!
    let topic: string = await room!.topic()
    log.info(botConfig.BotName, `received <======  Room: ${topic} ---- Contact: ${msg.talker().toString().slice(8, -1)} ---- Text: ${msg.text()}`)
    await start(msg)
}