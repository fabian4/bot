import {Contact, log} from "wechaty";

export default async function onLogout(user: Contact, reason: string) {
    log.info("ChatBot", `${user} logout, reason: ${reason}`);
}