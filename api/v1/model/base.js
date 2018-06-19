const mongoose = require('mongoose');

const baseSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    updated : {type : Date, default : Date.now},
});
module.exports = mongoose.model('Base',baseSchema);
