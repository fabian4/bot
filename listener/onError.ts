import {log} from "wechaty";
import botConfig from "../config";

export default async function onError(error: Error) {
    log.error(botConfig.BotName, 'on error: ', error.stack);
}