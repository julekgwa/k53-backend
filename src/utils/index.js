const HttpStatus = require('http-status-codes');

const ERROR_MSG =
  'Looks like the server is taking too long to respond, please try again later';
const CONN_ERROR =
  'There was an error connecting to the server. Please try again later';

function requestErrorHandler(error) {

  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let data = { message: ERROR_MSG };

  if (error.code === 'ECONNABORTED') {

    status = HttpStatus.REQUEST_TIMEOUT;

  } else if (error.code === 'ENOTFOUND') {

    data.message = CONN_ERROR;

  } else if (
    error &&
    error.response &&
    typeof error.response.data === 'object' &&
    error.response.data.error
  ) {

    data = {
      message: error.response.data.error
    };
    status = error.response.status;

  } else {

    (status =
      (error && error.response && error.response.status) ||
      HttpStatus.INTERNAL_SERVER_ERROR),
    (data = (error && error.response && error.response.data) || {
      message: CONN_ERROR
    });

  }

  return {
    status,
    data
  };

}

module.exports = {
  requestErrorHandler
};