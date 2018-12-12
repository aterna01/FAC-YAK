const http = require("http");
const router = require("./router");
const port = process.env.port || 8000;

const server = http.createServer(router);
server.listen(port, function() {
  console.log(
    `Server is up and running on port ${port}! Go make stuff happen!`
  );
});
