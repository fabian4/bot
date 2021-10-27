import {Contact, log, Message, Room} from "wechaty";
import botConfig from "../config";
import {Status, treaterGame} from "./pojo";

const gameInfo: Map<string, treaterGame> = new Map

export default async function start(msg: Message) {
    let room: Room = msg.room()!
    if (msg.text() === botConfig.START_KETWORD && msg.talker().self()) {
        if (!gameInfo.has(room.id)) {
            let contacts: Contact[] = await room.memberAll()
            gameInfo.set(room.id, new treaterGame(room, contacts));
        } else if (gameInfo.get(room.id)?.status === Status.END) {
            gameInfo.get(room.id)!.status = Status.START
        }
    }
    if (!gameInfo.has(room.id)) {
        return
    }
    let game: treaterGame = gameInfo.get(room.id) || Object.create(null)
    switch (game.status) {
        case Status.START:
            log.info(botConfig.BotName, "游戏准备阶段：开始初始化分发卡牌")
            initCard(game)
            break
        case Status.SAYING:
            log.info(botConfig.BotName, `接收到玩家[${msg.talker()}]的发言：${msg.text()}`)
            record(msg, game)
            break
        case Status.VOTING:
            break
        case Status.END:
            break
    }
}

function initCard(game: treaterGame) {
    game.room.say("游戏开始 正在给大家私发卡牌")
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
                log.info(botConfig.BotName, `向玩家[${contacts[i].toString().slice(8, -1)}]发送名词：${word}`)
            }
        )
    }
    game.status = Status.SAYING
}

function record(msg: Message, game: treaterGame) {
    if (msg.text().length >= 20) {
        return
    }
    let speaker: Contact = msg.talker()
    if (!game.saying.has(speaker.toString().slice(8, -1)) && !speaker.self()) {
        game.saying.set(speaker.toString().slice(8, -1), msg.text())
    }
    let comment: string = "当前的发言总结为："
    game.saying.forEach(
        (value, key) => {
            comment += `\n${key}: ${value}`
        }
    )
    game.room.say(comment)
    if (game.saying.size === game.contacts.length) {
        game.status = Status.VOTING
    }
}