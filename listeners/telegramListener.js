const TelegramSave = require('../models/telegramSaveRequest').TelegramSave;
const Bot = require('../modules/telegram-connect');
// Matches "/echo [whatever]"
Bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

// send back the matched "whatever" to the chat
  Bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
Bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  TelegramSave.parseRequestToChat(msg, chatId)
// bot.sendMessage(chatId, 'Received your message');
});

Bot.on('callback_query', (callback_query) => {
    console.log(callback_query)
  }
);