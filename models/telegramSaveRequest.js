const Bot = require('../modules/telegram-connect');
const BitMexPrices = require('../models/bitmexPrices').BitMexPrices;

const TelegramSave = function (data) {
  this.data = data;
}

TelegramSave.prototype.data = {}

TelegramSave.parseRequestToChat = function (userMessage, chatId) {
  let textReturn = '';
  switch (true){
    case /param/.test(userMessage.text):
      textReturn = 'You can get price with one of this parameter:\n'+
        '<b>highPrice</b>\n' +
        '<b>lastPrice</b>\n' +
        '<b>lastPriceProtected</b>\n' +
        '<b>bidPrice</b>\n' +
        '<b>midPrice</b>\n' +
        '<b>askPrice</b>\n' +
        '<b>impactBidPrice</b>\n' +
        '<b>impactMidPrice</b>\n' +
        '<b>impactAskPrice</b>\n' +
        '<b>markPrice</b>\n'+
        'just enter "get price {param you need}"';
      break;
    case /get price (.+)/.test(userMessage.text):
      let paramsAllForPrice = userMessage.text.split(' '),
        paramForPrice = paramsAllForPrice[paramsAllForPrice.length - 1];
      let price = BitMexPrices.getPrice(paramForPrice);
      if(price){
        textReturn = paramForPrice + ':' + price
      } else {
        textReturn = 'Sorry, no such parameter'
      }
      break;
    default:
      textReturn = 'Sorry, Im still learning and cannot response you now, but be sure that Ill help you soon!)'
  }
  sendMessagetelegram(textReturn, userMessage.chat.id);
}

function sendMessagetelegram (text, chatId) {
  Bot.sendMessage(chatId, text, {parse_mode:'HTML'});
}

module.exports.TelegramSave = TelegramSave;