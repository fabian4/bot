import {Contact, Room} from "wechaty";

const cards: string[][] = [
    ["可口可乐", "百事可乐"],
    ["茶百道", "七分甜"]
]

export class treaterGame {
    public roomId: string;
    public status: Status;
    public contacts: Contact[];

    public normal: string;
    public treater: string;
    public treaterId: string;

    public saying: Map<string, string>
    public voting: Map<string, number>

    constructor(room: Room, contacts: Contact[]) {
        this.roomId = room.id;
        this.status = Status.START;
        this.contacts = contacts.filter(
            (contact) => {
                return !contact.self()
            }
        );

        let card: string[] = cards[Math.random() * cards.length]
        this.normal = card[0]
        this.treater = card[1]

        this.treaterId = ""
        this.saying = new Map<string, string>()
        this.voting = new Map<string, number>()
    }

}

export enum Status {
    // 初始化类、分发卡牌
    START,
    // 发言环节
    SAYING,
    // 投票环节
    VOTING
}