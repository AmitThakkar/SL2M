/**
 * Created by amitthakkar on 15/07/16.
 */
'use strict';
const express = require('express');
const CONFIG = require('./config');
const PORT_NUMBER = CONFIG.PORT;

const app = express();

require('./route-mapping')(app);

app.listen(PORT_NUMBER, function () {
    console.log('NodeJS Server is listening on port', PORT_NUMBER);
});