# ChatBot —— a chat bot based on wechaty🚀🚀🚀
## 一、实现功能
1. admin微信账号的线上配置策略调整
2. 接入腾讯闲聊实现智能回复
3. 实现谁是卧底的群聊玩法，支持多群聊的进行
## 二、谁是卧底玩法流程
1. 选择一个群聊 发送关键字`谁是卧底`
2. 将所以群成员自动加入玩家列表
3. 从词库中随机抽取卡牌私聊发送给玩家
4. 记录玩家的陈述发言并公示
5. 发起投票记录票数
6. 淘汰票数最高的玩家
7. 卧底淘汰则游戏结束，或最后只剩卧底则卧底胜利
8. 没达到胜利条件回到`步骤4`
## 三、文件目录
~~~tree
│  .gitignore
│  config.ts // 配置文件
│  index.ts  // 入口文件
│  package-lock.json
│  package.json
│  README.md│
├─game
│   ├─ class.ts
│   └─ WhoIsTreater.ts // 谁是卧底
|─listener
│   ├─ onError.ts
│   ├─ onLogin.ts
│   ├─ onLogout.ts
│   ├─ onMessage.ts
│   └─ onScan.ts
└─util
    └─ TencentChat.ts // 腾讯闲聊
~~~
## 四、配置项
~~~typescript
export const botConfig = {
    BotName: "ChatBot",
    // 管理者的微信id
    adminId: "XXXXXXXXXXX",
    // 腾讯云相关
    TENCENT_SECRETID: "XXXXXXXXXXX",
    TENCENT_SECRETKEY: "XXXXXXXXXXX",
    // wechaty pad 协议的token
    WECHATY_PUPPET_SERVICE_TOKEN: "XXXXXXXXXXX",
    // 游戏启动关键字
    START_KETWORD: "谁是卧底"
}
~~~
## 五、启动和运行
~~~bash
1. git clone git@github.com:fabian4/ChatBot.git
2. cd ./ChatBot
3. npm install
4. npm run start
~~~
## 六、其他
1. 关于[Wechaty](https://github.com/wechaty/wechaty)和[Wechat pad协议](https://github.com/padlocal/wechaty-puppet-padlocal)
2. 关于WeChaty pad协议的 token的申请 👉 http://pad-local.com/
3. 关于腾讯闲聊 👉 https://cloud.tencent.com/document/product/271/39416
