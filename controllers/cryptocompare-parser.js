'use strict'

var messageGenerator = require('../tools/message-generator.js')
var request = require('request')

module.exports = {
    initDB: (senderID, PAGE_ACCESS_TOKEN) => {
        request({
            uri: 'https://min-api.cryptocompare.com/data/all/coinlist',
            method: 'GET'
        }, (error, response, body) => {
            var parse = JSON.parse(body)
            console.log(parse.Data["42"])
            var messageText = {
                status: 'error',
                message: 'I have imported crypto actifs informations of CryptoCompare to my database 👍',
                ticker: null,
                card: null
            }
            messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, messageText.message) 
        })
    },
}