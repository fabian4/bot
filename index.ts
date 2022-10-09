import { PuppetPadlocal } from 'wechaty-puppet-padlocal'
import { log, Wechaty } from 'wechaty'
import onScan from './listener/onScan'
import onLogout from './listener/onLogout'
import onLogin from './listener/onLogin'
import onMessage from './listener/onMessage'
import onError from './listener/onError'
import botConfig from './config'

const puppet = new PuppetPadlocal({
  token: botConfig.WECHATY_PUPPET_SERVICE_TOKEN
})

export const bot = new Wechaty({
  name: botConfig.BotName,
  puppet
})
  .on('scan', onScan)
  .on('login', onLogin)
  .on('logout', onLogout)
  .on('message', onMessage)
  .on('error', onError)

bot.start().then(() => {
  log.info(botConfig.BotName, 'started.')
})
