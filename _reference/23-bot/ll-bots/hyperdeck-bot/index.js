const llog = require('../utilities/ll-logs')
const { Telnet } = require('telnet-client');
const { conversationContext } = require('@slack/bolt/dist/conversation-store');
const cp = require("child_process")
const net = require('node:net')
const {PromiseSocket, TimeoutError} = require("promise-socket")


// const formatCommand = (client) => {
//     return new Promise((resolve, reject) => {

//     })
//     console.log(`connected to hyperdeck`)
//     client.write(`commands`)
//     client.on('data', (data) => {
//         resolve(data)
//     })
// }





// async function run() {
//     let connection = new Telnet()
//       // these parameters are just examples and most probably won't work for your use-case.
//     let params = {
//       host: process.env.HYPER_8_IP,
//       port: 23,
//       shellPrompt: '/ # ', // or negotiationMandatory: false
//       timeout: 1500
//     }
  
//     try {
//       await connection.connect(params)
//       let res = await connection.exec("commands\r\n")
//     console.log('async result:', res)
//     } catch (error) {
//         console.error(error)
//       // handle the throw (timeout)
//     }
  
    
//   }


const getCode = async (cb) => {
    const socket = new net.Socket()
    const promiseSocket = new PromiseSocket(socket)
    await promiseSocket.connect("9993", process.env.HYPER_8_IP)
    socket.setEncoding('utf-8')
    socket.on('data', (data) => {
        llog.yellow(data)
        if (/^216/.test(data)) {
            cb(data)
            socket.end()
        }  
    })
    await promiseSocket.write("format: slot id: 1 prepare: HFS+\r\n")
}

async function sendCommand({ ip, port, command, successCode }) {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket()
        const promiseSocket = new PromiseSocket(socket)
        const infoRegex = new RegExp("500 connection info:")
        const successRegex = new RegExp(successCode)
        promiseSocket.connect(port, ip)
        socket.setEncoding('utf-8')
        socket.on('data', (data) => {
            if (successRegex.test(data)) {
                llog.yellow(data)
                resolve(data)
                socket.destroy()
            } 
            else if (!infoRegex.test(data)) {
                llog.blue(data)
                resolve(data)
                socket.destroy()
            } 
            else {
                llog.gray(data)
            }
        })
        promiseSocket.write(`${command}\r\n`)
    })
}

module.exports.hyperFormat = async () => {
    llog.blue(`about to format`)
    let codeData = await sendCommand({
        ip: process.env.HYPER_8_IP,
        port: 9993,
        command: "format: slot id: 1 prepare: HFS+",
        successCode: "^216"
    })
    llog.red(codeData)
    let theCode = codeData.split("\r\n")[1]
    llog.red({code: theCode})
    llog.blue(`format: confirm: ${theCode}`)
    let formatResult = await sendCommand({
        ip: process.env.HYPER_8_IP,
        port: 9993,
        command: `format: confirm: ${theCode}`,
        successCode: "^200"
    })
    llog.cyan(formatResult)
}

// module.exports.hyperStopAndPlayback = async () => {
    
// }
