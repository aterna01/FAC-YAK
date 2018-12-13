const handlers = require("./handler");

const routes = [
  "/img/favicon.ico",
  "/img/bolt-icon.png",
  "/css/reset.css",
  "/css/styles.css",
  "/js/request.js",
  "/js/scripts.js"
];

// read file extensions
// const path = require("path");
// const filePath = path.join(__dirname, "..", "public", "index.html");

const router = (req, res) => {
  const url = req.url;
  const method = req.method;

  // home route
  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  }

  // load files
  else if (routes.includes(url)) {
    handlers.handlePublic(req, res);

    // talks route
  } else if (url.indexOf("/getTalks") !== -1) {
    handlers.handleTalks(req, res);

    // POST stuff and cookies:

    // } else if (method === "POST" && url.includes("/sendDetails")) {
    //   console.log("this is a post request");
    //   handlers.handlePostData(req, res);
  } else {
    res.writeHead(404, "Content-Type: text/html");
    res.end("<h1>404 File not found</h1>");
  }
};

module.exports = router;
