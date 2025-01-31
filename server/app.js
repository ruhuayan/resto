require('dotenv').config();
const express = require('express');
const config = require('./src/config/config');

const app = express();

module.exports = require('./src/config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
