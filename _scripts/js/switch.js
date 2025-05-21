#!/usr/bin/env node

// const atemTools = require('./src/tools/utilities/atem-tools')
require('dotenv').config();
var yargs = require('yargs').argv;

const { Atem } = require('atem-connection');

const doTheThing = async (source) => {
    console.log(`starting the ATEM`);
    const myAtem = new Atem();
    myAtem.on('info', console.log)
    myAtem.on('error', () => {console.error})
    myAtem.connect(process.env.A8K_IP)
    myAtem.on('connected', () => {
        myAtem.changeProgramInput(source).then(() => {
            console.log(`program input set to ${source}. now ending the connection`);
            myAtem.disconnect()
        })
    })
    myAtem.on('disconnected', () => {
        console.log(`now disconnected from the ATEM. bye.`);
        process.exit()
    })
    // if we can't connect within 10 seconds we'll give up
    setTimeout(()=>{
        myAtem.destroy();
        console.log(`sorry, we couldn't connect to the ATEM`);
    }, 10000)
}


console.log("launching it.")

if (yargs) {
   console.log(JSON.stringify(yargs, null, 4))
   console.log(`switching to ${yargs._[0]}`)
   doTheThing(yargs._[0])
//    console.log("done")
} else {
    console.log(`sorry, you didn't enter a recognized command.`)
}