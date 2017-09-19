const BitMexPrices = {};
const Prices = [];

BitMexPrices.savePrices = function (pricesData) {
  // console.log(pricesData);
  Prices.push(pricesData);
  cleanPricesArr()
}

BitMexPrices.getPrice = function (param) {
  let lastPrices = Prices[Prices.length -1];
  let priceToReturn = lastPrices[0][param];
  return priceToReturn;
}

function cleanPricesArr () {
  if(Prices.length >= 10){
    Prices.shift();
  }
}
module.exports.BitMexPrices = BitMexPrices;