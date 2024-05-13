const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = false;
const hostname = "googlelogindemo.netlify.app";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const allowedHosts = [
  "googlelogindemo.netlify.app",
  "www.googlelogindemo.netlify.app",
];

const invalidHttpMethod = [
  "TRACE",
  "PUT",
  "DELETE",
  "OPTIONS",
  "DEBUG",
  "FETCH",
  "HEAD",
  "CONNECT",
  "PATCH",
];

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    //Security Check
    if (invalidHttpMethod.includes(req.method)) {
      res.statusCode = 405;
      res.end("Method not Allowed");
      return;
    }
    if (!allowedHosts.includes(req.headers.host)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }
    //
    
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
  });
});
