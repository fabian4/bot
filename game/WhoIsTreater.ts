import {Contact, log, Message, Room} from "wechaty";
import botConfig from "../config";
import {Status, treaterGame} from "./pojo";

const gameInfo: Map<string, treaterGame> = new Map

export default async function start(msg: Message) {
    let room: Room = msg.room()!
    if (msg.text() === botConfig.START_KETWORD && msg.talker().self()) {
        let contacts: Contact[] = await room.memberAll()
        if (!gameInfo.has(room.id)) {
            gameInfo.set(room.id, new treaterGame(room, contacts));
        } else if (gameInfo.get(room.id)?.status === Status.END) {
            gameInfo.get(room.id)!.status = Status.START
            gameInfo.get(room.id)!.players = contacts
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
            log.info(botConfig.BotName, `接收到玩家[${msg.talker().toString().slice(8, -1)}]的发言：${msg.text()}`)
            record(msg, game)
            break
        case Status.VOTING:
            vote(msg, game)
            break
        case Status.END:
            break
    }
}

function initCard(game: treaterGame) {
    game.room.say("游戏开始 大家开始发言")
    let players: Contact[] = game.players
    game.treaterPlayer = players[parseInt(String(Math.random() * players.length))]
    for (let i = 0; i < players.length; i++) {
        let word: string = ""
        if (players[i].id === game.treaterPlayer.id) {
            word = game.treater
        } else {
            word = game.normal
        }
        players[i].say("当前您拿到的名词是：" + word).then(
            () => {
                log.info(botConfig.BotName, `向玩家[${players[i].toString().slice(8, -1)}]发送名词：${word}`)
            }
        )
    }
    game.status = Status.SAYING
}

function record(msg: Message, game: treaterGame) {
    if (msg.talker().self()) {
        return
    }
    let speaker: Contact = msg.talker()
    if (!game.saying.has(speaker.name())) {
        game.saying.set(speaker.name(), msg.text())
    }
    let comment: string = "当前的发言总结为：\n------------------"
    game.saying.forEach(
        (value, key) => {
            comment += `\n[${key}]: ${value}`
        }
    )
    game.room.say(comment)
    if (game.saying.size === game.players.length) {
        game.status = Status.VOTING
        let msg = "发言结束 下面开始投票环节\n------------------"
        for (let i = 0; i < game.players.length; i++) {
            msg += `\n${i + 1}号：[${game.players[i].name()}]`
        }
        game.room.say(msg)
    }
}

function vote(msg: Message, game: treaterGame) {
    let num: number = parseInt(msg.text().replace(/[^0-9]/ig, ""))
    if (num <= 0 || num > game.players.length) {
        return
    }
    if (game.voting.has(game.players[num - 1])) {
        game.voting.set(game.players[num - 1], (game.voting.get(game.players[num - 1]) || 0) + 1)
    } else {
        game.voting.set(game.players[num - 1], 1)
    }
    game.voter++
    if (game.voter === game.players.length) {
        judge(game)
    }
}

function judge(game: treaterGame) {
    let outer: Contact = game.players[0]
    let maxVote: number = game.voting.get(outer) || 0
    game.voting.forEach(
        (value, key) => {
            if (value > maxVote) {
                maxVote = value
                outer = key
            }
        }
    )
    let res: string = "票数结果如下：\n------------------"
    for (let i = 0; i < game.players.length; i++) {
        res += `\n[${game.players[i].name()}]: ${game.voting.get(game.players[i])}票`
    }
    if(game.treaterPlayer.id === outer.id){
        res += `\n卧底出局 玩家胜利！！！！！！！！！！！！`
        game.status = Status.END
    }else if(game.players.length === 2){
        res += `\n[${outer.name()}]玩家出局`
        res += `\n卧底胜利！！！  [${game.treaterPlayer.name()}] 为本局卧底`
        game.status = Status.END
    }else {
        res += `\n[${outer.name()}]玩家出局 游戏继续`
        for (let i = 0; i < game.players.length; i++) {
            if(game.players[i].id === outer.id){
                game.players.splice(i, 1)
            }
        }
        game.status = Status.SAYING
    }
    game.room.say(res)
}