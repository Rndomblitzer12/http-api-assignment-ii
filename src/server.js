const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlResponseHandler.getIndex,
  '/success': jsonResponseHandler.success,
  '/badRequest': jsonResponseHandler.badRequest,
  '/unauthorized': jsonResponseHandler.unauthorized,
  '/forbidden': jsonResponseHandler.forbidden,
  '/internal': jsonResponseHandler.internal,
  '/notImplemented': jsonResponseHandler.notImplemented,
  '/notFound': jsonResponseHandler.notFound,
  index: htmlResponseHandler.getIndex,
  '/style.css': htmlResponseHandler.getStyle,
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // Accept header
  const acceptHeaders = request.headers.accept.split(',');

  const params = query.parse(parsedUrl.query);

  // XML/JSON Parse
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct['/notFound'](request, response, params);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
