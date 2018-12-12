//import tape
const test = require("tape");
//import supertest
const supertest = require("supertest");
//import router file for supertest
const router = require("../src/router.js");

test("Check that tape is working", t => {
  t.equals(1, 1, "1 should equal 1, duh.");
  t.end();
});

// ------ Test 200 status on index.html ------
// test("Check that status code for index is 200", t => {
//   supertest(router)
//     .get("/")
//     .expect(200)
//     .end((err, res) => {
//       t.error(err);
//       t.end;
//     });
// });

// ------ Test for 404 errors ------
// test("check if status code of non-existent URL is 404", t => {
//   supertest(router)
//     .get("/omgidontexist")
//     .expect(404)
//     .expect("Content-Type", /html/)
//     .end((err, res) => {
//       t.error(err);
//       t.equal(
//         res.text,
//         "404 not found error",
//         "response should contain '404 not found error'"
//       );
//       t.end();
//     });
// });
