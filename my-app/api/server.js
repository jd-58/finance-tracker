const express = require('express');
const cors = require('cors');
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const app = express();
const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
    origin: 'http://www.jacob-deaton.com'
    }
));
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok4');
});

app.post('/api/transaction', [
    body('name').trim().escape(),
    body('username').trim().escape(),
    body('password').trim().escape(),
    body('price').isNumeric(),
    body('description').trim().escape(),
    body('datetime').isISO8601().toDate()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, password, price, description, datetime } = req.body;
    const isCleared = 'no' // set isCleared to 'no' by default
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transaction = await Transaction.create({name, username, password, price, description, isCleared, datetime});
        res.json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/clear-transactions', async (req, res) => {
    const { username, password } = req.body;
    try {
        await mongoose.connect(process.env.MONGO_URL);
        await Transaction.updateMany({ username, password, isCleared: 'no' }, { isCleared: 'yes' });
        res.json({ message: 'Transactions cleared' });
    } catch (error) {
        console.error('Error clearing transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/transactions', async (req, res) => {
    const { username, password } = req.query; // Get username and password from query parameters
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        await mongoose.connect(process.env.MONGO_URL);
        const transactions = await Transaction.find({ username, password, isCleared: 'no' });
        // Filter transactions by username and password, and making sure isCleared is 'no'
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4040, () => {

});