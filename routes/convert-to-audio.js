const path = require('path');
const convertToWav = require('../convert-audio');
module.exports = (app) => {
  app.post('/convert-audio', (req, res) => {
    const url = req.query.mediaUrl;
    // TODO: scramble file names to be unique?
    // TODO: use system TMP dir?
    const audioFileOutput = path.join(__dirname, 'test.ogg')
    console.log('url:: ',url);
    convertToWav(url, audioFileOutput, function(newFile) {
        console.log('newFile:: ',newFile)
        // TODO: add error handling 
        // https://expressjs.com/en/api.html
        res.sendFile(audioFileOutput);
        // TODO use sendFile or download?
         // res.download(newFile, 'test-media-conversion.ogg')
        // res.status(200).json({status:"ok"});
    })
  });
}
