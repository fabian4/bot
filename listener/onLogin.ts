import { Contact, log } from 'wechaty'
import botConfig from '../config'

export default async function onLogin (user: Contact) {
  log.info(botConfig.BotName, `${user} login`)
}
