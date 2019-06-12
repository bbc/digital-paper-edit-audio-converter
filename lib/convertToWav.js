// originally from https://github.com/OpenNewsLabs/autoEdit_2/blob/master/lib/interactive_transcription_generator/transcriber/convert_to_audio.js

/**
* @module convertToWav
* @description Convers video file into wav (or any ffmpeg supported input)
* takes in input file, output destination file, and callback,
* IBM sudgested audio compression {@link http://www.ibm.com/watson/developercloud/doc/speech-to-text/input.shtml#limits}
* callback returns audio file name/path
* @example <caption>usage</caption>
var convertToWav = require('./index.js');

convertToWav(file, audioFile, function(newFile) {
  //do something with the converted file, returned as a string file path
}
* @requires fluent-ffmpeg
*/
// "use strict";

const ffmpegBin = require('ffmpeg-static-electron');

const ffmpegBinPath = ffmpegBin.path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegBinPath);

/**
 * @function convertToWav
 * @param {string} file -  path to audio or viceo file to convert to wav
 * @param {string} audioFileOutput - path to output ogg audio file
 * @returns {callback} callback - callback to return audio file path as string.
*/
function convertToWav(file, audioFileOutput, callback) {
  console.log(file);
  // running ffmpeg command
  const command = ffmpeg(file)
    .noVideo()
    .audioCodec('libopus')
    .audioChannels(1)
    .audioFrequency(16000)
    .output(audioFileOutput)
    .on(
      'end',
      // listener must be a function, so to return the callback wrapping it inside a function
      (() => {
        callback(audioFile);
      }) ||
      (() => {
        console.log('Finished processing');
      }),
    )
    .run();
}

module.exports = convertToWav;
