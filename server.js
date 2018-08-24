// server.js
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
const baseApiUrl = 'https://sorteggiolegaforum.herokuapp.com';

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default

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

//proxy middleware
let options = {
  target: baseApiUrl,
  changeOrigin: true,
  logLevel: 'debug',
  onError: function onError(err, req, res) {
    console.log('Something went wrong with the proxy middleware.', err);
    res.end();
  }
 };
 app.use('/backEnd', proxy(options)); //only forward calls with '/backEnd' route
//proxy middleware

// Heroku port
app.listen(process.env.PORT || 4200);
