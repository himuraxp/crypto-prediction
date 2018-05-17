'use strict'

var sendToAPI = require('./send-to-api.js')

module.exports = {
    sendGenericMessage: (recipientId, PAGE_ACCESS_TOKEN, cards) => {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: { card: cards }
                    }
                }
            }
        }
        sendToAPI.callSendAPI(PAGE_ACCESS_TOKEN, messageData)
    },
    sendInfoMessage: (recipientId, PAGE_ACCESS_TOKEN, ticker) => {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "image",
                    payload: {
                        url: "https://www.cryptocompare.com/media/20646/"+ticker+".png"
                    }
                }
            }
        }
        sendToAPI.callSendAPI(PAGE_ACCESS_TOKEN, messageData)
    },
    sendTextMessage: (recipientId, PAGE_ACCESS_TOKEN, messageText) => {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText,
                metadata: "DEVELOPER_DEFINED_METADATA"
            }
        }
        sendToAPI.callSendAPI(PAGE_ACCESS_TOKEN, messageData)
    }
}