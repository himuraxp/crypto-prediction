module.exports = (query) => {
    if (query.match(/(ETH|eth|Eth|(E|e)(thereum|THEREUM))/gm)) {
        return { ticker: 'eth', name: 'Ethereum' }
    }
    if (query.match(/(NEO|neo|(N|n)(eo|EO))/gm)) {
        return { ticker: 'neo', name: 'NEO' }
    }
    if (query.match(/(LSK|lsk|Lsk|(L|l)(isk|ISK))/gm)) {
        return { ticker: 'lsk', name: 'Lisk' }
    }
    if (query.match(/(ADA|ada|Ada|(C|c)(ardano|ARDANO))/gm)) {
        return { ticker: 'ada', name: 'Cardano' }
    }
    if (query.match(/(EOS|eos|(E|e)(os|OS))/gm)) {
        return { ticker: 'eos', name: 'EOS' }
    }
    if (query.match(/(XLM|xlm|Xlm|(S|s)(telar|TELAR))/gm)) {
        return { ticker: 'xlm', name: 'Stelar' }
    }
    if (query.match(/(IOT|iot|Iot|(I|i)(ota|OTA))/gm)) {
        return { ticker: 'iot', name: 'IOTA' }
    }
    if (query.match(/(TRX|trx|Trx|(T|t)(ron|RON))/gm)) {
        return { ticker: 'trx', name: 'Tron' }
    }
    if (query.match(/(VEN|ven|Ven|(V|v)(e(C|c)hain|ECHAIN))/gm)) {
        return { ticker: 'ven', name: 'VeChain' }
    }
    if (query.match(/(SC|sc|Sc|(S|s)(ia(C|c)oin|IACOIN))/gm)) {
        return { ticker: 'sc', name: 'Siacoin' }
    }
    if (query.match(/(BCH|bch|Bch|BCC|bcc|Bcc|(B|b)(it(C|c)oin|ITCOIN(( C| c|C|c)ash|ASH)))/gm)) {
        return { ticker: 'bch', name: 'Bitcoin Cash' }
    }
    if (query.match(/(LTC|ltc|Ltc|(L|l)(ite(C|c)oin|ITECOIN))/gm)) {
        return { ticker: 'ltc', name: 'Litecoin' }
    }
    if (query.match(/(OMG|omg|Omg|(O|o)(mise(G|g)o|MISEGO))/gm)) {
        return { ticker: 'omg', name: 'Omisego' }
    }
    if (query.match(/(Q|q)(tum|TUM)/gm)) {
        return { ticker: 'qtum', name: 'Qtum' }
    }
    if (query.match(/(Xrp|XRP|xrp|(R|r)(ipple|IPPLE))/gm)) {
        return { ticker: 'xrp', name: 'Ripple' }
    }
    if (query.match(/(XMR|Xmr|xmr|(M|m)(onero|ONERO))/gm)) {
        return { ticker: 'xmr', name: 'Monero' }
    }
    if (query.match(/(XVG|Xvg|xvg|(V|v)(erge|ERGE))/gm)) {
        return { ticker: 'xvg', name: 'Verge' }
    }
    if (query.match(/(BTC|btc|Btc|(B|b)(itcoin|itCoin|ITCOIN))/gm)) {
        return { ticker: 'btc', name: 'Bitcoin' }
    }
}