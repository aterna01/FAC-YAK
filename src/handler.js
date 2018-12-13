const fs = require("fs");
const path = require("path");

// database queries
const getData = require("./db_handlers/getData");
const postData = require("./db_handlers/postData");
const getUser = require("./db_handlers/getUser");


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






// signup
const handleSignUp = (request, response) => {
  // console.log(request, " handleSignUp");

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

    // post to db
    // - args will be: person, food, veg, paid
    postData(formData, (err, res) => {
      if (err) console.log(err);
    });
  });
};





// handle login on login form submit
const handleLogin = (request, response) => {
  
  // get data from form
  let allTheData = "";
  request.on("data", function(chunkOfData) {
    allTheData += chunkOfData;
  });

  request.on("end", function() {
    // use form data
    const formData = allTheData.split("&");

    const userName = formData[0].split("=")[1];
    const password = formData[1].split("=")[1];

    // compare user and hashed password to password in database
    // if matches, log in
    // console.log(userName, password);
    getUser(userName, (err, res) => {
      if (err) console.log(err);
      // some callback here
      // maybe writeHead and redirect with res.end?
    });





  });
}




module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTalks,
  handleSignUp,
  handleLogin
};
