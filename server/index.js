/**
 * Created by amitthakkar on 15/07/16.
 */
'use strict';
const express = require('express');
const CONFIG = require('./config');
const PORT_NUMBER = CONFIG.PORT;

const app = express();

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
require('./route-mapping')(app);

app.listen(PORT_NUMBER, function () {
    console.log('NodeJS Server is listening on port', PORT_NUMBER);
});