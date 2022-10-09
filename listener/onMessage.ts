import { Message } from 'wechaty'

export default async function onMessage (msg: Message) {
  console.log(msg)
}
