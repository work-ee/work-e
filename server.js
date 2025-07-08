const next = require("next");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const portHttp = 3000; // HTTP → redirect
const portHttps = 3001; // New HTTPS server

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
};

app.prepare().then(() => {
  // HTTPS
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(portHttps, () => {
      console.log(`✅ HTTPS => https://localhost:${portHttps}`);
    });

  // HTTP => HTTPS
  http
    .createServer((req, res) => {
      const redirectUrl = `https://localhost:${portHttps}${req.url}`;
      res.writeHead(301, { Location: redirectUrl });
      res.end();
    })
    .listen(portHttp, () => {
      console.log(`🔁 HTTP redirect http://localhost:${portHttp} => https://localhost:${portHttps}`);
    });
});
