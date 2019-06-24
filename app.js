const config = require('config');
const Consumer = require('sqs-consumer');

const logger = require('./logger');
const handler = require('./lib/messageHandler');

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
