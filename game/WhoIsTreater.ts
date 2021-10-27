import {Contact, log, Message, Room} from "wechaty";
import botConfig from "../config";
import {Status, treaterGame} from "./pojo";

const gameInfo: Map<string, treaterGame> = new Map

export default async function start(msg: Message) {
    let room: Room = msg.room()
    let game: treaterGame = await getGame(room) || Object.create(null)
    switch (game.status) {
        case Status.START:
            log.info(botConfig.BotName, "游戏准备阶段：开始初始化分发卡牌")
            initCard(game);
            break;
        case Status.SAYING:
            log.info(botConfig.BotName, `接收到玩家[${msg.talker()}]的发言：${msg.text()}`)
            record(msg)
    }
}

async function getGame(room: Room): Promise<treaterGame | undefined> {
    if (gameInfo.has(room.id)) {
        return gameInfo.get(room.id)!
    } else {
        let contacts: Contact[] = await room.memberAll()
        let game = new treaterGame(room, contacts);
        gameInfo.set(room.id, game);
        return game;
    }
}

function initCard(game: treaterGame) {
    let contacts: Contact[] = game.contacts
    game.treaterId = contacts[parseInt(String(Math.random() * contacts.length))].id
    for (let i = 0; i < contacts.length; i++) {
        let word: string = ""
        if (contacts[i].id === game.treaterId) {
            word = game.treater
        } else {
            word = game.normal
        }
        contacts[i].say("当前您拿到的名词是：" + word).then(
            () => {
                log.info(botConfig.BotName, `向玩家[${contacts[i]}]发送名词：${word}`)
            }
        )
    }
    game.status = Status.SAYING
}

function record(msg: Message){

}