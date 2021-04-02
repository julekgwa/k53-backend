const getQuestions = require('./getQuestions');

module.exports = (app) => {
  app.get('/v1/questions', getQuestions);
};