'use strict'

var checkTicker = require('../tools/check-ticker.js')
var messageGenerator = require('../tools/message-generator.js')
var request = require('request')

module.exports = {
    research: (senderID, PAGE_ACCESS_TOKEN, query) => {
        var ticker = checkTicker(query)
        if (!ticker) {
            var messageText = {
                status: 'error',
                message: '😱 Sorry! I don\'t know this Crypto.',
                ticker: null,
                card: null
            }
            messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, messageText.message)
        } else {
            messageGenerator.sendTextMessage(senderID, PAGE_ACCESS_TOKEN, "😅 please wait a moment i'm doing a "+ticker.name+" search")
            request({
                uri: 'https://min-api.cryptocompare.com/data/price?fsym='+ticker.ticker.toUpperCase()+'&tsyms=USD,EUR',
                method: 'GET'
            }, (error, response, price) => {
                var priceParse = JSON.parse(price)
                request({
                    uri: 'https://min-api.cryptocompare.com/data/all/coinlist',
                    method: 'GET'
                }, (error, response, body) => {
                    var parse = JSON.parse(body)
                    var symbole = ticker.ticker.toUpperCase()
                    var cryptoAsset = parse.Data[symbole]
                    var subtitle = "Ticker: "+cryptoAsset.Symbol
                                    +"\nPrice today: "+priceParse["USD"]+" $ / "+priceParse["EUR"]+" €"
                                    +"\nTotal coin supply: "+cryptoAsset.TotalCoinSupply
                    var card = {
                        title: ticker.name.toUpperCase(),
                        subtitle: subtitle,
                        item_url: "https://www.cryptocompare.com"+cryptoAsset.Url,
                        image_url: "https://www.cryptocompare.com"+cryptoAsset.ImageUrl
                    }
                    var messageText = {
                        status: 'success',
                        message: 'Yes I have information about '+ticker.name,
                        ticker: ticker.ticker,
                        card: card
                    }
                    messageGenerator.sendGenericMessage(senderID, PAGE_ACCESS_TOKEN, messageText.card)
                })
            })
        }
    },
}