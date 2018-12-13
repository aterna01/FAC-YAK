// import tape, supertest, router
const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router.js");


// tape works
// test("Check that tape is working", t => {
//   t.equals(1, 1, "1 should equal 1, duh.");
//   t.end();
// });




// ______________________________________________
// test the server routes
test("Home route returns 200 status code", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});
// - testing a route that does not exist
test("Invalid url returns 500 status code", t => {
  supertest(router)
    .get("/armadillo")
    .expect(500)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 500, "Should return 500");
      t.end();
    });
});

// - css
test("style.css file loading as expected", t => {
  supertest(router)
    .get("/css/styles.css")
    .expect(200)
    .expect("Content-Type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});
// - js
test("index.js file loading as expected", t => {
  supertest(router)
    .get("/js/index.js")
    .expect(200)
    .expect("Content-Type", 'application/javascript')
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});





// ______________________________________________
// - testing a GET request with /getTalks in the url
test("GET request from /getTalks on page load", t => {
  supertest(router)
    .get("/getTalks")
    .expect(200)
    .expect("Content-Type", 'application/JSON')
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});
// - testing a GET request with an incorrect url
test("GET request from /whatever on page load fails - returns 500", t => {
  supertest(router)
    .get("/whatever")
    .expect(500)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 500, "Should return 500");
      t.end();
  });
});



//______________________________________________
// - testing a POST from signup form
// test("POST request from /signUp", t => {
//   supertest(router)
//     .post("/signUp")
//     .expect(200)
//     .expect("Content-Type", 'application/JSON')
//     .end((err, res) => {
//       t.error(err);
//       t.equal(res.statusCode, 200, "Should return 200");
//       t.end();
//   });
// });
// // - testing a POST request with incorrect url
// test("POST request with incorrect url fails - returns 500", t => {
//   supertest(router)
//     .post("/dashboard")
//     .expect(500)
//     .end((err, res) => {
//       t.error(err);
//       t.equal(res.statusCode, 500, "Should return 500");
//       t.end();
//   });
// });