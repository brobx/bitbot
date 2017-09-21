const Bot = require('../modules/telegram-connect');
const AlertsModel = require('../schemas/alertsSchema').AlertsModel;

const Alerts = function (data) {
  this.data = data;
}

Alerts.prototype.data = {}

Alerts.saveSimpleAlert = function (chatId, value, type) {
  AlertsModel.create({})
  return new Promise(
    function (resolve, reject) {
      AlertsModel.create({
        chat_id: chatId,
        type: type,
        status: 1,
        value: value,
        alertWorked: 0
      }, function (err, alert) {
        if (err) {
          reject(err);
        } else {
          resolve (alert);
        }
      })
    });
}

module.exports.Alerts = Alerts;