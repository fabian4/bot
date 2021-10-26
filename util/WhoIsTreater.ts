import {Message} from "wechaty";

export default function WhoIsTreater(isGame: boolean, msg: Message){
    if(!isGame || !msg.room()){
        return
    }
}