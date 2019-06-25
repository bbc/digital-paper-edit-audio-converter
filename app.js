const config = require('config');
const express = require('express');
const { Consumer } = require('sqs-consumer');

const logger = require('./logger');
const handler = require('./lib/messageHandler');

const ENV = process.env.ENV || 'dev';
const PORT = process.env.PORT || 8080;

const queue = Consumer.create({
  queueUrl: config.get('queue.url'),
  handleMessage: handler.handle,
});

queue.on('processing_error', (err) => {
  logger.error(err.message);
});

queue.on('error', (err) => {
  logger.error(err.message);
});

queue.on('message_received', (message) => {
  logger.info('Received message', message.MessageId);
});

queue.on('message_processed', (message) => {
  logger.info('Processed message', message.MessageId);
});

queue.start();

// simple server for ELB health-check
const app = express();

const server = app.listen(PORT, () => {
  console.log(`ENV: ${ENV} | listening on port ${PORT}`);
});

server.on('error', (err) => {
  logger.error(err);
});

app.get('/status', (req, res) => {
  res.sendStatus(200);
});
