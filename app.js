const restify = require('restify');
var server = restify.createServer();
const path = require('path');
const SERVER_IP = process.env.IP || '127.0.0.1';

server.get(
  '/*',
  restify.plugins.serveStatic({
    directory: path.join(__dirname, 'images'),
  })
);

function respond(req, res, next) {
  res.send('Test');
  next();
}


server.get('/', respond);
server.get('/questions', (req, res, next) => {
  res.json({
    questions: [
      {
        title: 'The most important RULE OF THE ROAD in South Africa is?',
        possibleAnswers: [
          {
            label:
              'Always be courteous and considerate towards fellow road users.',
            isChecked: 'unchecked',
          },
          {
            label: 'Do not exceed the speed limit.',
            isChecked: 'unchecked',
          },
          {
            label: 'Keep to the left side of the road far as is safe.',
            isChecked: 'unchecked',
          },
        ],
        correct: 2,
        answer: -1,
      },
      {
        title: 'A light/heavy vehicle should not carry a load that projects...',
        possibleAnswers: [
          {
            label: 'More than 10 metres to the front of the vehicle.',
            isChecked: 'unchecked',
          },
          {
            label: 'More than 1.8 metres to the back of the vehicle.',
            isChecked: 'unchecked',
          },
          {
            label: 'Less than 1.8 millimetres to the left.',
            isChecked: 'unchecked',
          },
        ],
        correct: 1,
        answer: -1,
      },
    ]
  })
  next();
})

server.listen(8080, SERVER_IP, function() {
  console.log('%s listening at %s', server.name, server.url);
});