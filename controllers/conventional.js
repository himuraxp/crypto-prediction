'use strict'

var messageGenerator = require('../tools/message-generator.js')
var request = require('request')

var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
    hello: (senderID, PAGE_ACCESS_TOKEN) => {
        request({
            uri: `https://graph.facebook.com/v2.9/${senderID}`,
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var text = ["Hey ", "Hi ", "Hello ", "Yop ", "Morning ", "Welcome ", "Yo ", "Yep ", "Good morning "]
                var random = getRandomInt(text.length)
                messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, text[random] + body.first_name)
            } else {
                console.log(error)
            }
        })
    },
    bye: (senderID, PAGE_ACCESS_TOKEN) => {
        request({
            uri: `https://graph.facebook.com/v2.9/${senderID}`,
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var text = ["Ciao!", "++", "Have a good day", "Bye", "Later", "See you soon!", "See you", "Tciao", "Best regards", "Bye bye"]
                var random = getRandomInt(text.length)
                messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, text[random])
            } else {
                console.log(error)
            }
        })
    },
    thanks: (senderID, PAGE_ACCESS_TOKEN) => {
        request({
            uri: `https://graph.facebook.com/v2.9/${senderID}`,
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var text = ["You're welcome", "To serve you", "Whit pleasure", "When you want 😉"]
                var random = getRandomInt(text.length)
                messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, text[random])
            } else {
                console.log(error)
            }
        })
    },
    dontknow: (senderID, PAGE_ACCESS_TOKEN, query) => {
        request({
            uri: `https://graph.facebook.com/v2.9/${senderID}`,
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var text = ["I do not understand about "]
                var random = getRandomInt(text.length)
                messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, text[random]+query)
            } else {
                console.log(error)
            }
        })
    },
    presentation: (senderID, PAGE_ACCESS_TOKEN) => {
        request({
            uri: `https://graph.facebook.com/v2.9/${senderID}`,
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var text = "I am HimuraBot. \n\nMy designer Yohann Winchester has just created me so I do not have great faculties at the moment. But my knowledge will increase with time.\n\nMy skills:\n- Give you information about crypto assets (ex: What is bitcoin?)\n- I can show you recent weets with the hashtag of your choice (ex: #ethereum)\n- I can give you the latest prices of crypto (ex: BTC price)\n\nI hope I'll be useful"
                messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, text)
            } else {
                console.log(error)
            }
        })
    },
}