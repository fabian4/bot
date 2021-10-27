import {Contact, Room} from "wechaty";

const cards: string[][] = [
    ["可口可乐", "百事可乐"],
    ["AD钙", "旺仔牛奶"],
    ["口香糖", "薄荷糖"],
    ["小番茄", "圣女果"]
]

export class treaterGame {
    public room: Room
    public roomId: string
    public status: Status
    public players: Contact[]

    public normal: string
    public treater: string
    public treaterPlayer: Contact

    public voter: number

    public saying: Map<string, string>
    public voting: Map<Contact, number>

    constructor(room: Room, contacts: Contact[]) {
        this.room = room
        this.roomId = room.id
        this.status = Status.START
        this.players = contacts.filter(
            (contact) => {
                return !contact.self()
            }
        );

        let card: string[] = cards[parseInt(String(Math.random() * cards.length))]
        this.normal = card[0]
        this.treater = card[1]

        this.voter = 0
        this.treaterPlayer = Object.create(null)
        this.saying = new Map<string, string>()
        this.voting = new Map<Contact, number>()
    }

}

export enum Status {
    // 开始
    START,
    // 发言环节
    SAYING,
    // 投票环节
    VOTING,
    // 结束
    END
}