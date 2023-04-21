const jwt = require("jsonwebtoken");
var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    }, 'my-secret',
    {
      expiresIn: 60 * 120
    });
  };
  
  var generateToken = function (req, res, next) {
    try {
      req.token = createToken(req.auth);
      return next();
    } catch (err) {
      console.log('Generate token failed')
    }
  };
  
  var sendToken = function (req, res) {
    try {
      res.setHeader('x-auth-token', req.token);
      console.log(req.token)
      return res.status(200).send(JSON.stringify(req.user));
    } catch (err) {
      console.log('Send token failed')
    }
  };

  module.exports = {
    generateToken,
    sendToken,
  };