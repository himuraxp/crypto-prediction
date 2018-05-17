'use strict'

var request = require('request')

module.exports = {
    callSendAPI: (PAGE_ACCESS_TOKEN, messageData) => {
        console.log(messageData)
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id
                var messageId = body.message_id

                if (messageId) {
                    console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId)
                } else {
                    console.log("Successfully called Send API for recipient %s", recipientId)
                }
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error)
            }
        })
    },
}