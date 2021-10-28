import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import botConfig from '../config'

const NlpClient = tencentcloud.nlp.v20190408.Client

const clientConfig = {
  credential: {
    secretId: botConfig.TENCENT_SECRETID,
    secretKey: botConfig.TENCENT_SECRETKEY
  },
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'nlp.tencentcloudapi.com'
    }
  }
}

export const client = new NlpClient(clientConfig)
