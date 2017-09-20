const Bot = require('../modules/telegram-connect');
const BitMexPrices = require('../models/bitmexPrices').BitMexPrices;

const TelegramSave = function (data) {
  this.data = data;
}

TelegramSave.prototype.data = {}

TelegramSave.parseRequestToChat = function (userMessage, chatId) {
  let textReturn = '';
  let mode = {}
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
      mode = {parse_mode:'HTML'};
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
      mode = {parse_mode:'HTML'};
      break;
    case /commands/.test(userMessage.text):
      mode = {reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Current price', callback_data: '1' }],
          [{ text: 'Set minimum price alert', callback_data: '2' }],
          [{ text: 'Set maximum price alert', callback_data: '3' }],
          [{ text: 'Set alert for price change in period of time', callback_data: '4' }],
          [{ text: 'Show active alerts', callback_data: '5' }]
        ]
      })}
      textReturn = 'This is possible commands that you can use with this buttons';
      break;
    default:
      textReturn = 'Sorry, Im still learning and cannot response you now, but be sure that Ill help you soon!)'
  }
  sendMessagetelegram(textReturn, userMessage.chat.id, mode);
}

function sendMessagetelegram (text, chatId, mode) {
  Bot.sendMessage(chatId, text, mode);
}

module.exports.TelegramSave = TelegramSave;