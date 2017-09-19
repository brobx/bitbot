const Bitmex = require('../modules/bitmex-connect');
const BitMexPrices = require('../models/bitmexPrices').BitMexPrices;

Bitmex.addStream('XBTUSD', 'instrument', function(data, symbol, tableName) {
  BitMexPrices.savePrices(data)
});