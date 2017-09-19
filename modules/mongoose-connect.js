const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});
module.exports = mongoose;