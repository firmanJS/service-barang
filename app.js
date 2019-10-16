var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/barang');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res) {
//   if(req.socket.remoteAddress !== 'http://localhost:7500'){
//     res.writeHead(403, {"Content-Type": "text/plain"});
//     res.write('403 Access Denied');
//     res.end();
//   }
// });
app.use(usersRouter);

module.exports = app;
