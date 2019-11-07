const functions = require("firebase-functions");
const { convertToAudio } = require("@bbc/convert-to-audio");

// const input = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
// const output = "./ted-talk.wav";

const convert = async (request, response) => {
  const payload = request.body;
  if (payload) {
    try {
      const audioFile = await convertToAudio(payload.input, payload.output);
      response.download(audioFile);
    } catch (err) {
      console.error(err);
      response.send(
        `There was a problem processing your audio file: 
        ${err}. Passed payload:${JSON.stringify(payload)}`
      );
    }
  } else {
    response.send("No URL given");
  }
};

exports.stripAudio = functions.https.onRequest((request, response) =>
  convert(request, response)
);
