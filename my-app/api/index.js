const express = require('express');
const app = express();
console.log('starting server');


app.get('/api/test', (req, res) =>
{ console.log('Received request on /api/test');
    res.json('test ok');
});

app.listen(4040, () => { console.log('Server is running on port 4040'); });