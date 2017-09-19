const mongoose = require('../modules/mongoose-connect'),
    Schema = mongoose.Schema;

const userData = new Schema({
    phone_id: {type: String},
},{ collection: 'userDatas' });

const UserData = mongoose.model('userData', userData);

module.exports.UserData = UserData;