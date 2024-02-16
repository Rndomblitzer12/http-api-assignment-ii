const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Success - 200
const success = (request, response) => {
  const responseJSON = {
    message: 'Response was successful.',
  };
  respondJSON(request, response, 200, responseJSON);
};

// Bad Request
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'Required params are present.',
  };

  // Param missing ?valid=true / code 400
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Has param ?valid=true / code 200
  return respondJSON(request, response, 200, responseJSON);
};

// Unauthorized
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  // Param missing ?loggedIn=yes / code 401
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  // Has param ?loggedIn=yes / code 200
  return respondJSON(request, response, 200, responseJSON);
};

// Forbidden 403
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

// Internal 500
const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON);
};

// Not Implemented 501
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

// Not Found 404
const notFound = (request, response) => {
  const responseJSON = {
    message: '404 Not Found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
