const mongoose = require('../modules/mongoose-connect'),
    Schema = mongoose.Schema;

const alertsSchema = new Schema({
    chat_id: {type: String},
    type: {type: String},
    status: {type: Boolean},
    value: {type: String},
    alertWorked: {type: Boolean}

},{ collection: 'alerts' });

const AlertsModel = mongoose.model('alerts', alertsSchema);

module.exports.AlertsModel = AlertsModel;