var express = require('express');
var router = express.Router();
var SaltClient = require('../lib/salt-client.js')

/* GET users listing. */
router.post('/', function(req, res, next) {

  var saltClient = new SaltClient('https', 'localhost', '8000');

  saltClient.login('lee', '573v09891', function(err, token){
    res.send(token);
  });

});

module.exports = router;
