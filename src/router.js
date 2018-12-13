const handlers = require("./handler");

// read file extensions
const path = require("path");
const filePath = path.join(__dirname, "..", "public", "index.html");

const router = (req, res) => {
  const url = req.url;
  const method = req.method;

  // home route
  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  }

  // talks route - on load
  else if (url.indexOf("/getTalks") !== -1) {
    handlers.handleTalks(req, res);
  }

  // POST stuff and cookies:
  // } else if (method === "POST" && url.includes("/sendDetails")) {
  //   console.log("this is a post request");
  //   handlers.handlePostData(req, res);
  
  // load files. Must load last!
  else if (filePath.indexOf("public") !== -1) {
    handlers.handlePublic(req, res);
  }

  // 404s
  else {
    res.writeHead(404, "Content-Type: text/html");
    res.end("<h1>404 File not found</h1>");
  }
};

module.exports = router;
