const converter = require('./convert-to-audio');

exports.handle = async (event) => {
  const message = JSON.parse(event.Body);

  if (message.job_type === 'convert_audio') {
    converter.convertToAudio(message);
  }

  return {
    status: 'unable_to_process',
  };
};
