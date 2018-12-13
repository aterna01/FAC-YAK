const dbConnection = require("../../database/db_connection");

const getData = cb => {
  dbConnection.query(
    "SELECT name, title, date, time FROM users INNER JOIN talks ON users.id = talks.user_id",
    (error, result) => {
      if (error) {
        console.log(error, "GET data error");
        cb(error);
      } else {
        const talks = result.rows.slice();
        cb(null, talks);
      }
    }
  );
};

module.exports = getData;
