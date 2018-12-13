const fs = require("fs");
const path = require("path");
const getData = require("./db_handlers/getData");
// const request = require("request");

// getData and postData
// const postData = require("./handler/postData");

//
// output talks list on GET
// const getFoods = require("./handler/getFoods");

// home route
const handleHomeRoute = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

// load files
const handlePublic = (request, response) => {
  const url = request.url;
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-ico",
    jpg: "image/jpeg",
    png: "image/png"
  };
  const extension = url.split(".")[1];
  const filePath = path.join(__dirname, "..", "public", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("this is an error");
    } else {
      response.writeHead(200, {
        "Content-Type": `${extensionType[extension]}`
      });
      response.end(file);
    }
  });
};



// load all talks on page load
const handleTalks = (request, response) => {
  getData((err, res) => {
    if (err) throw err;
    const output = JSON.stringify(res);
    response.writeHead(200, { "Content-Type": "application/JSON" });
    response.end(output);
  });
};



module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTalks
};