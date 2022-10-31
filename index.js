const path = require('path');
const fs = require('fs');
const http = require('http');

/**
 *
 * Help Status Code
 *
 * 200 - Successful retrieval
 * 201 - Successful creation
 *
 * 400 - Bad request
 * 401 - Forbidden
 *
 * 500 - Server error
 *
 *
 */

const server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    'public',
    request.url === '/' ? 'index.html' : request.url
  );
  let contentType = getContentType(filePath) || 'text/html';
  let emptyPagePath = path.join(__dirname, 'public', '404.html');
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      if (err.code === 'ENDENDT') {
        fs.readFile(emptyPagePath, 'utf8', (err, content) => {
          response.writeHead(200, { 'Content-type': contentType });
          response.end(content);
        });
      } else {
        response.writeHead(500);
        response.end('A Server Error has Occurred');
      }
    }
    if (!err) {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content);
    }
  });
});

const getContentType = (filePath) => {
  let extname = path.extname(filePath);
  if (extname === '.js') {
    return 'text/javascript';
  }
  if (extname === '.css') {
    return 'text/css';
  }
  if (extname === '.png') {
    return 'image/png';
  }
  if (extname === '.jpg') {
    return 'image/jpg';
  }
};

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on port $(port)`);
});
