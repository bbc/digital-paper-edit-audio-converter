const converter = require('./converter');

exports.handle = async (event) => {
  const message = JSON.parse(event.Body);

  if (message.job_type === 'convert_audio') {
    converter.convertToWav(message);
  }

  return {
    status: 'unable_to_process',
  };
};
