const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const TransactionSchema = new Schema({
    name: {type: String, required:true},
    username: {type: String, required:true},
    price: {type: Number, required:true},
    description: {type: String, required:true},
    datetime: {type: Date, required:true},
    password: {type: String, required:true}
});

const TransactionModel = model('Transaction', TransactionSchema);

module.exports = TransactionModel;