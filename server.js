const { createServer } = require("https");
const { readFileSync } = require("fs");
const next = require("next");

const app = next({ dev: true });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./localhost-key.pem"), // Use your existing SSL key
  cert: readFileSync("./localhost.pem"), // Use your existing SSL cert
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    handle(req, res);
  }).listen(3001, () => {
    console.log("🚀 Server running on https://localhost:3001");
  });
});
