// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  };
};
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use(function(req, res, next) {
  //Cross origin allowance
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "POST, OPTIONS, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});