const { getQuestions } = require('../client/k53Client');

async function getQuestionsService() {

  try {

    return {
      status: 200,
      result: await getQuestions(),
    };

  } catch (error) {

    throw error;

  }

}

module.exports = {
  getQuestionsService
}