const BitMEXClient = require('bitmex-realtime-api');

const client = new BitMEXClient({testnet: true});

module.exports = client;