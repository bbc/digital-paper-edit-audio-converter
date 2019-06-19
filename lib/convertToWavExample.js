const convertToWav = require('./index.js');

const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const audioFileOutput = './test2.ogg';

convertToWav(url, audioFileOutput, (newFile) => {
  console.log(newFile);
});
