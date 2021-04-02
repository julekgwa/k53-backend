const { pool } = require('./dbConnection');

async function getQuestions() {

  const sql = 'select * from questions inner join answers on questions.id = answers.questionId order by answers.id';

  const connection = await pool.getConnection();
  const [rows] = await connection.query(sql);

  await connection.release();

  return rows;

}

module.exports = {
  getQuestions
}