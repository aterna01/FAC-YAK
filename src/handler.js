const fs = require("fs");
const path = require("path");
const getData = require("./db_handlers/getData");
const postData = require("./db_handlers/postData");

const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");

const SECRET = "Ihatecheese";
const userDetails = { userId: 5, role: "admin" };
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

//res.setHeader('Set-Cookie', 'logged_in=true');

// OR

//res.writeHead(200, { 'Set-Cookie': 'logged_in=true' });
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
        // "Set-Cookie": "jwt=0; Max-Age=0"
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
    response.writeHead(200, {
      "Content-Type": "application/JSON",
      "Set-Cookie": "jwt=0; Max-Age=0"
    });
    response.end(output);
  });
};

const handleSignUp = (request, response) => {
  console.log(request.formdata, " handleSignUp");
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
    console.log("formdata is:", formData);

    let formDataArray = formData.join("").split("&");
    console.log(formDataArray);

    let name = formDataArray[0].split("=")[1];
    console.log(name);

    let password = formDataArray[1].split("=")[1];
    console.log(password);

    const namePassword = [name, password];

    // post to db

    postData(namePassword, (err, res) => {
      console.log("yep");
      if (err) {
        console.log("posdata error is: ", err);
        //this file logs the user console.log
      } else {
        const cookie = sign(userDetails, SECRET);
        console.log(cookie);
        console.log("HELLO");
        // response.redirect("/dashboard");
        response.writeHead(302, {
          //;

          Location: "/checkAuthentification",

          "Set-Cookie": `jwt=${cookie}; HttpOnly; Max-Age=9000`
        });
        console.log("Hi");
        return response.end("end");
      }
    });
  });
};

const handlerAuthenticate = (request, response) => {
  if (request.headers.cookie) {
    let filePath = path.join(__dirname, "..", "public", "dashboard.html");
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

    // console.log("here is your cookie", req.headers.cookie);
    // res.writeHead(302, { Location: "./public/dashboard.html" });
    // res.end();
  } else {
    console.log("COOKIE?", request.headers.cookie);
    filePath = path.join(__dirname, "..", "public", "index.html");
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
    // response.writeHead(302, { Location: "./public/index.html" });
    // response.end();
  }
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTalks,
  handleSignUp,
  handlerAuthenticate
};
