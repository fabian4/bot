import * as tencentcloud from "tencentcloud-sdk-nodejs"

const NlpClient = tencentcloud.nlp.v20190408.Client;

const clientConfig = {
    credential: {
        secretId: "AKIDvfBRQAdssc5HDtIRL0OVMwFH7i25sPfe",
        secretKey: "jDRO4UdV6RWLs89sKVQ5TbSP5UdW9VaO",
    },
    region: "ap-guangzhou",
    profile: {
        httpProfile: {
            endpoint: "nlp.tencentcloudapi.com",
        },
    },
};

export const client = new NlpClient(clientConfig);
