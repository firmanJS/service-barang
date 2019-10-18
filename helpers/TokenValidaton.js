'use strict';
const jwt = require('jsonwebtoken')
const redis = require('redis')
const client = redis.createClient()
exports.verifyToken =  function (req,res,next){
  const token = req.headers['x-token-api'];
  jwt.verify(token, 'ExpressRestFullAPIGateway', (err) => {
    if (err) return res.json({
      status:401,
      auth: false,
      message: 'Failed to authenticate token not match !'
    });
    next();
  });
}
exports.verifyAuthorizationView =  function (req,res,next){
  const token = req.headers['x-token-api']
  const decoded = jwt.verify(token, 'ExpressRestFullAPIGateway');
  if(decoded.userToken.permision.view == false){
    return res.json({
      status:403,
      authorization: false,
      message: 'You Have No Access !'
    });
  }
  next();
}
exports.verifyAuthorizationEdit =  function (req,res,next){
  const token = req.headers['x-token-api']
  const decoded = jwt.verify(token, 'ExpressRestFullAPIGateway');
  // res.json(decoded);
  if(decoded.userToken.permision.edit == false){
    return res.json({
      status:403,
      authorization: false,
      message: 'You Have No Access !'
    });
  }
  next();
}
exports.verifyAuthorizationDelete =  function (req,res,next){
  const token = req.headers['x-token-api']
  const decoded = jwt.verify(token, 'ExpressRestFullAPIGateway');
  // res.json(decoded);
  if(decoded.userToken.permision.delete == false){
    return res.json({
      status:403,
      authorization: false,
      message: 'You Have No Access !'
    });
  }
  next();
}
exports.verifyAuthorizationSave =  function (req,res,next){
  const token = req.headers['x-token-api']
  const decoded = jwt.verify(token, 'ExpressRestFullAPIGateway');
  // res.json(decoded);
  if(decoded.userToken.permision.save == false){
    return res.json({
      status:403,
      authorization: false,
      message: 'You Have No Access !'
    });
  }
  next();
}

exports.RedisAutoFlush = function (req,res,next){
  client.flushdb(function (err, succeeded) {
    console.log(succeeded);
    next();
  });
}
