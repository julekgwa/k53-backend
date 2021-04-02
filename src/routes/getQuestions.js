const { getQuestionsService } = require('../service/k53Service');
const Sentry = require("@sentry/node");

module.exports = async function getQuestions(req, res, next) {

  try {

    const { status, result } = await getQuestionsService();

    res.status(status);
    res.json({ result });

  } catch (error) {

    Sentry.captureException(error);

    const { status, data } = requestErrorHandler(error);

    res.status(status);
    res.json({ ...data });

  }

  next();

}