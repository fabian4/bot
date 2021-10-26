import {log, Message} from "wechaty";
import {client} from "../util/TencentChat";
import {ContactType} from "wechaty-puppet";
import botConfig from "../config";
import WhoIsTreater from "../game/WhoIsTreater";

const config = {
    isGame: true,
    isAutoChat: false
}

export default async function onMessage(msg: Message) {

    // admin控制
    changeConfig(msg)

    // 腾讯闲聊
    autoChat(config.isAutoChat, msg)

    // 谁是卧底
    WhoIsTreater(config.isGame, msg)
}

function changeConfig(msg: Message){
    if(msg.talker().id === botConfig.adminId){
        if(msg.text() === "config"){
            msg.talker().say(`isGame: ${config.isGame}\nisAutoChat: ${config.isAutoChat}`)
        }
        if(msg.text() === "game"){
            config.isGame = !config.isGame
            msg.talker().say(`配置成功 ==> isGame: ${config.isGame}`)
        }
        if(msg.text() === "chat"){
            config.isAutoChat = !config.isAutoChat
            msg.talker().say(`配置成功 ==> isAutoChat: ${config.isAutoChat}`)
        }
    }
}

function autoChat(isAutoChat: boolean, msg: Message) {
    if (!isAutoChat || msg.talker().id === botConfig.adminId) {
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