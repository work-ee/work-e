import fs from "fs";
import https from "https";
import { createServer } from "https";
import next from "next";

const port = 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => handle(req, res))
    .listen(port, () => {
      console.log(`> Ready on https://localhost:${port}`);
    });
});
