const dbConnection = require("../../database/db_connection");

const getUser = (userName, cb) => {
  dbConnection.query(
    `SELECT password from users WHERE name LIKE('${userName}')`,
    (error, result) => {
      if (error) {
        console.log(error, "GET user from database error");
        cb(error);
      } else {
        const users = result.rows.slice();
        cb(null, users);
      }
    }
  );
};

module.exports = getUser;
