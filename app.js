const restify = require('restify');

function respond(req, res, next) {
  res.send('Test');
  next();
}

var server = restify.createServer();
server.get('/', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});