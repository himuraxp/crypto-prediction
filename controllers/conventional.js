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
}