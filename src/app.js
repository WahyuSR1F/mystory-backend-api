const express = require('express');
const routes = require('./routes');
const bodyParse = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParse.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})