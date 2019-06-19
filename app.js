const path = require('path');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./logger');

const app = express();

const PORT = process.env.PORT || 8080;
const ENV = process.env.PORT || 'dev';

app.use(bodyParser.json());

const staticDirectory = path.join(__dirname, '..', 'static');

app.use(express.static(staticDirectory));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDirectory, 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
});

const server = app.listen(PORT, () => {
  logger.info(`listening on ${config.get('host')} | Port ${PORT}`);
  logger.info(`Current NODE_ENV setting: ${ENV}`);
});

server.on('error', (err) => {
  logger.error(err);
});

require('./routes/index')(app);
require('./routes/status')(app);

module.exports = app;
