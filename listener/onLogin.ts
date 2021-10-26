import {Contact, log} from "wechaty";
import {bot} from "../main";

export default async function onLogin(user: Contact) {
    log.info("ChatBot", `${user} login`);
    const contactList = await bot.Contact.findAll()
    for (let i = 0; i < 10; i++) {
        console.log(contactList[i])
    }
}