import {Contact, log, Message, Room} from "wechaty";
import botConfig from "../config";
import {Status, treaterGame} from "./pojo";

const gameInfo: Map<string, treaterGame> = new Map

export default async function WhoIsTreater(isGame: boolean, msg: Message) {
    if (!isGame || !msg.room()) {
        return
    }
    let room: Room = msg.room()!
    let topic: string = await room.topic()

    if (topic != "大家一起喝橙汁") {
        return;
    }
    log.info(botConfig.BotName, `received <======  Room: ${topic} ---- Contact: ${msg.talker()!.name()} ---- Text: ${msg.text()}`)


    let game: treaterGame = await getGame(room) || undefined
    switch (game.status){
        case Status.START:
            initCard(game);
            break;
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

function initCard(game: treaterGame){
    console.log(game)
    // for (let i = 0; i < game.contacts.length; i++) {
    //
    // }
}