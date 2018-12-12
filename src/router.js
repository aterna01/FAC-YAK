const handlers = require("./handler");

const routes = [
  "/img/favicon.ico",
  // "/img/pizza_bg_pale.jpg",
  "/css/styles.css",
  "/css/reset.css",
  "/js/request.js",
  "/js/app.js"
];

const router = (req, res) => {
  const url = req.url;
  const method = req.method;

  // console.log(url);
  if (url === "/") {
    handlers.handleHomeRoute(req, res);
  } else if (routes.includes(url)) {
    handlers.handlePublic(req, res, url);
    // } else if (url.indexOf("/getFoods") !== -1) {
    //   handlers.handleFoods(req, res);
    // } else if (method === "POST" && url.includes("/sendDetails")) {
    //   console.log("this is a post request");
    //   handlers.handlePostData(req, res);
  } else {
    res.writeHead(404, "Content-Type: text/html");
    res.end("<h1>404 File not found</h1>");
  }
};

module.exports = router;
