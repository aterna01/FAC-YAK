const fs = require("fs");
const path = require("path");
const getData = require("./db_handlers/getData");
const postData = require("./db_handlers/postData");
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

const handleSignUp = (request, response) => {
  console.log(request, " handleSignUp");

  // standard form behaviour - data gets sent to a new webpage in html format

  // receive data from the form
  let allTheData = "";
  request.on("data", function(chunkOfData) {
    // text from form - outputs buffers
    allTheData += chunkOfData;
  });

  request.on("end", function() {
    // use form data
    const formData = allTheData.split(",");
    console.log("formdata : ", formData);

    // post to db
    // - args will be: person, food, veg, paid
    postData(formData, (err, res) => {
      if (err) console.log(err);
      // const postResult = res;

      // run AFTER postData is run - get latest item output to DOM
      // ...but that doesn't seem to work
      // getData((err, res) => {
      //   if (err) throw err;
      //   const output = JSON.stringify(res);
      //   response.writeHead(200, { "Content-Type": "application/JSON" });
      //   response.end(output);
      // });
    });
  });
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTalks,
  handleSignUp
};
