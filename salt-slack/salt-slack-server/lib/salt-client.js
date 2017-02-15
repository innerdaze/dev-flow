var querystring = require('querystring');
var config = require('config');
// var fs = require('fs');

function SaltClient(protocol, host, port){
  this.protocol = protocol || config.get('salt.protocol');
  this.host = host || config.get('salt.hostname');
  this.port = port || config.get('salt.port');

  this.useHttps = protocol == 'https';

  this.requestModule = require(this.useHttps ? 'https' : 'http');

  if (this.useHttps && ( process.env.DEBUG || process.env.NODE_ENV == 'DEBUG' )){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
}

SaltClient.prototype.login = function(username, password, callback){
  if (!username || !password || !callback){
    throw Error("Incorrect Usage: Required arguments: username, password, callback");
  }

  var formData = querystring.stringify({
    eauth: 'pam',
    username: username,
    password: password
  });

  var options = {
    host: this.host,
    port: this.port,
    path: '/login',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': formData.length
    },
    // key: fs.readFileSync('ssl/key.pem'),
    // cert: fs.readFileSync('ssl/cert.pem')
  };

  // options.agent = new https.Agent(options);

  var req = this.requestModule.request(options, function(res) {
    res.on('data', function(d) {
      var responseData = JSON.parse(d);
      var token = responseData.return[0].token

      callback(null, token);
    });

    res.on('error', function(d) {
      callback(error);
    });
  });

  req.write(formData);

  req.end();
};

module.exports = SaltClient;
