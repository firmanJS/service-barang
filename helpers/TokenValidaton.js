'use strict';
const jwt = require('jsonwebtoken')
const redis = require('redis')
const client = redis.createClient()
exports.verifyToken =  function (req,res,next){
  const token = req.headers['x-token-api'];
  jwt.verify(token, 'ExpressRestFullAPI', (err) => {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token not match !'
    });
    next();
  });
}
exports.verifyAuthorization =  function (req,res,next){
  const statusView = true;
  if(statusView == false){
    return res.status(500).send({
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
