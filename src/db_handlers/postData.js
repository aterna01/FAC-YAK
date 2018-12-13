const dbConnection = require("../../database/db_connection.js");

// common table expressions
// - insert into one table, use this to add to another

// beware of variable shadowing below
// - use of err and res in nested queries
// - use different names for these
// - e.g. (err, res), (error, result), (fail, success)

const postData = (formData, cb) => {
  // name
  const name = formData[0];
  // console.log(name);

  // password
  const password = formData[1];

  // 1. users table
  dbConnection.query(
    // return personId which contains people_id - to be passed in to bookings table
    "INSERT INTO users (name, password) VALUES ($1, $2)",
    [name, password],
    (err, success) => {
      // console.log(personId); // logs out object for person, passed into bookings
      if (err) {
        return err;
      } else {
        cb(null);
      }
    }
  );
};

module.exports = postData;
