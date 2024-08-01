const express = require('express');
const cors = require('cors');
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok4');
});

app.post('/api/transaction', async (req, res) => {
    const { name, username, password, price, description, datetime } = req.body; // Include price here
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transaction = await Transaction.create({name, username, password, price, description, datetime});
        res.json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/transactions', async (req, res) => {
    const { username, password } = req.query; // Get username and password from query parameters
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactions = await Transaction.find({ username, password }); // Filter transactions by username and password
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4040, () => {

});