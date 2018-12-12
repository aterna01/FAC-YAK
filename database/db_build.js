const fs = require("fs");
// const pgp = require('pg-promise')(initOptions);

// const pg = require(""())//
const buildDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = require("./db_connection");
    const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

    connection.query(sql, () => {
      try {
        resolve("database created");
        connection.end(() => {
          console.log("connection closed");
        });
      } catch {
        reject("error");
      }
    });
  });
};

buildDatabase()
  .then(res => console.log(res))
  .catch(err => console.log(err));

module.exports = buildDatabase;
