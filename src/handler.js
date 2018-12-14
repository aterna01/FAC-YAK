const fs = require("fs");
const path = require("path");

// database queries
const getData = require("./db_handlers/getData");
const postData = require("./db_handlers/postData");
// const getUser = require("./db_handlers/getUser");


// cookie / jwt stuff
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
 const SECRET = "Ihatecheese";
const userDetails = { userId: 5, role: "admin" };


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
    
    // not sure we want to reset the cookie, attach this to logout button handler
    response.writeHead(200, {
      "Content-Type": "application/JSON",
      "Set-Cookie": "jwt=0; Max-Age=0"
    });


    response.end(output);
  });
};






// signup
const handleSignUp = (request, response) => {

  // receive data from the form
  let allTheData = "";
  request.on("data", function(chunkOfData) {
    allTheData += chunkOfData;
  });

  // on end
  request.on("end", function() {

    // format form data
    const formDataArray = allTheData.split("&");

    // console.log(formDataArray);
    const name = formDataArray[0].split("=")[1];
    // console.log(name);
    const password = formDataArray[1].split("=")[1];
    // console.log(password);
    const namePassword = [name, password];



    // post to db
    postData(namePassword, (err, res) => {
      if (err) {
        console.log('postdata error:', err);
      }
      // postdata worked
      else {
        const cookie = sign(userDetails, SECRET);
        console.log(namePassword[0] + '\'s cookie is: ', cookie);

        response.writeHead(
          302,
          {
            Location: "/dashboard",
            "Set-Cookie": `jwt=${cookie}; HttpOnly; Max-Age=9000`
          }
        )
        response.end();
      }
      
    });



  });
};






// dashboard
// - possibly use a 302 redirect instead
// - don't need to load files
const handleDashboard = (request, response) => {

  // cookie set - send to dashboard
  if (request.headers.cookie) {
    const filePath = path.join(__dirname, "..", "public", "dashboard.html");
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
  }
  
  // no cookie set - send to home
  else {
    filePath = path.join(__dirname, "..", "public", "signup-login.html");
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
  }
}







// handle login on login form submit
// const handleLogin = (request, response) => {
  
//   // get data from form
//   let allTheData = "";
//   request.on("data", function(chunkOfData) {
//     allTheData += chunkOfData;
//   });

//   request.on("end", function() {
//     // use form data
//     const formData = allTheData.split("&");

//     const userName = formData[0].split("=")[1];
//     const password = formData[1].split("=")[1];

//     // compare user and hashed password to password in database
//     // if matches, log in
//     // console.log(userName, password);
//     getUser(userName, (err, res) => {
//       if (err) console.log(err);
//       // some callback here
//       // maybe writeHead and redirect with res.end?
//     });

//   });
// }




module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTalks,
  handleSignUp,
  handleDashboard
  // handleLogin
};
