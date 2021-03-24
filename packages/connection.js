const mysql = require("mysql");
var dbCredentials = {
    host:"localhost",
    user:"root",
    password:"*******",
    database:"gas"
}
var connection = mysql.createConnection(dbCredentials);

module.exports = connection;