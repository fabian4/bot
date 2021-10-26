import {Contact, log} from "wechaty";

export default async function onLogin(user: Contact) {
    log.info("ChatBot", `${user} login`);
}