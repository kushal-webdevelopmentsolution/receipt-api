

var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var http = require('http');
var app = express();

var port = 5434;
require('./app/webservice')(app)
app.use(express.static(__dirname));
app.use(helmet());

var server = http.createServer(app);
server.on('uncaughtException', function (req, res, route, err) {
  log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
  if (!res.headersSent) {
    return res.send(500, {ok: false});
  }
  res.write('\n');
  res.end();
});
console.log("Port ",port);
server.listen(port);

exports = module.exports = app;


