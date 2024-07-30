const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.json('test ok')
});

app.listen(3000);