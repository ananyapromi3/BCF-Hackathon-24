// require("dotenv").config();

let oracledb = require("oracledb");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

class Repository {
  constructor() {
    this.connection = undefined;
  }
  // code to execute sql
  execute = async (query, params=[]) => {
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          user: "LEARNLY",
          password: "12345",
          connectionString: "localhost/orclpdb",
        });
      }
      console.log(query, params);
      result = await this.connection.execute(query, params);
      return {
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log("COULD NOT CONNECT TO ORACLE");
      console.log(error);
      console.log(query, params);
      return {
        success: false,
        error: error,
      };
    }
  };
  execute_pl = async (query, params=[]) => {
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          user: "LEARNLY",
          password: "12345",
          connectionString: "localhost/orclpdb",
        });
      }
      // console.log("=>", query, params);
      result = await this.connection.execute(query, params);
      return {
        success: true,
        data: result.outBinds && result.outBinds.ret ? result.outBinds.ret : null,
      };
    } catch (error) {
      console.log(error.message);
      let message = error.message.split("\n")[0].split(":")[1].trim();
      if (error.errorNum == 1400) {
        message = "Invalid Input";
      }
      console.log(query, params, message, error.errorNum);
      return {
        success: false,
        error: message,
        errorNum: error.errorNum,
      };
    }
  };
}
module.exports = Repository;
// const oracledb = require("oracledb");
// async function runApp(query) {
//   let connection;
//   try {
//     connection = await oracledb.getConnection({
//       user: "LEARNLY",
//       password: "12345",
//       connectionString: "localhost/orclpdb",
//     });
//     console.log("Successfully connected to Oracle Database");

//     const result = await connection.execute(query);
//     //console.log(result);
//    console.log(result.rows);
//     return result.rows;
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }
// //runApp();

// export default runApp;
