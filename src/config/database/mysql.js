const mysql = require('mysql')

const conn = mysql.createConnection({
    username: "root",
    password: "Mysql123",
    host: "localhost",
    database: "backend_exam",
    port: 3306
})

module.exports = conn