const _ = require('lodash');
const sinon = require('sinon');

const messageHandler = require('../../lib/messageHandler');
const converter = require('../../lib/convert-to-audio');

const sandbox = sinon.createSandbox();

const sqsMessage = require('../fixtures/message.json');

describe('messageHandler', () => {
  beforeEach(() => {
    sandbox.stub(converter, 'convertToAudio').resolves(0);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('calls the convertToAudio for convert_audio job types', async () => {
    const testMessage = _.cloneDeep(sqsMessage);

    const messageBody = {
      job_type: 'convert_audio',
      file_type: '.mp3',
      file_name: 'not body on the moor',
      s3_location: 'https://digital-paper-edit.s3.amazonaws.com/not+body+on+the+moor.mp3',
    };

    testMessage.Body = JSON.stringify(messageBody);

    await messageHandler.handle(testMessage);
    sinon.assert.calledWith(converter.convertToAudio, messageBody);
  });

  it('does not invoke a converter when job message is not correct', async () => {
    const testMessage = _.cloneDeep(sqsMessage);

    const messageBody = {
      job_type: 'not_an_audio_conversion_job',
    };

    testMessage.Body = JSON.stringify(messageBody);

    await messageHandler.handle(testMessage);
    sinon.assert.notCalled(converter.convertToAudio);
  });
});
