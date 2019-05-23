const express = require('express');

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  next();
});

app.use((err, req, res, next) => {
    console.log(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      status: statusCode,
      message: err.message
    });
});

require('./routes/convert-to-audio')(app);

module.exports = app;