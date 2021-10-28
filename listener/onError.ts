import { log } from 'wechaty';
// @ts-ignore
import botConfig from '../config.ts';

export default async function onError(error: Error) {
  log.error(botConfig.BotName, 'on error: ', error.stack);
}
