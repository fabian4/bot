import { Contact, log } from 'wechaty'
import botConfig from '../config'

export default async function onLogout (user: Contact, reason: string) {
  log.info(botConfig.BotName, `${user} logout, reason: ${reason}`)
}
