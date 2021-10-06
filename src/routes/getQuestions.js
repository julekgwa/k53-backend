const { getQuestionsService } = require('../service/k53Service');
const Sentry = require("@sentry/node");
const { requestErrorHandler } = require('../utils');

module.exports = async function getQuestions(req, res, next) {

  try {

    const { status, result } = await getQuestionsService();

    res.status(status);
    res.json({ result });

  } catch (error) {
console.log(error)
    Sentry.captureException(error);

    const { status, data } = requestErrorHandler(error);

    res.status(status);
    res.json({ ...data });

  }

  next();

}