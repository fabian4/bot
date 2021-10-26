import {log, ScanStatus} from "wechaty";

export default async function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting && qrcode) {
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('')
        log.info("ChatBot", `onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
        require('qrcode-terminal').generate(qrcode, {small: true})  // show qrcode on console
    } else {
        log.info("ChatBot", `onScan: ${ScanStatus[status]}(${status})`);
    }
}