import { Room, Message } from 'wechaty'
import { bot } from '../index'

export default async function onMessage (msg: Message) {

  if (msg.room() == null) {
    return
  }
  const room = msg.room()
  console.log(room!.id)
  if (room!.id === '21424016941@chatroom') {
    const text = msg.text()
    // console.log(msg.talker().name() + ' ' + text)
    if (text.startsWith('二狗')) {
      const tar = await bot.Room.find({ id: '20668539392@chatroom' })
      await msg.forward(tar!)
    }
  }

  if (room!.id === '20668539392@chatroom') {
    const text = msg.text()
    // console.log(msg.talker().name() + ' ' + text)

    if (text.startsWith('@下沙李拜天')) {
      const res = text.replace('@下沙李拜天', '')
      console.log(res)
      if (res.length !== 0) {
        const tar = await bot.Room.find({ id: '21424016941@chatroom' })
        await tar!.say(res)
      }
    }
  }
}
