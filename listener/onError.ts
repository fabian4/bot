import {log} from "wechaty";

export default async function onError(error: Error) {
    log.error("ChatBot", 'on error: ', error.stack);
}