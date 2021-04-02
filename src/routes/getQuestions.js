const { getQuestionsService } = require('../service/k53Service');

module.exports = async function getQuestions(req, res, next) {

  try {

    const { status, result } = await getQuestionsService();

    res.status(status);
    res.json({ result });

  } catch (error) {

    req.log.error(':: addNewSupplier :: Error adding a new client', error);

    const { status, data } = requestErrorHandler(error);

    res.status(status);
    res.json({ ...data });

  }

  next();

}