const mysql = require("mysql2");

// 创建连接
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "0826",
//   database: "vue_demo"
// });

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const config = process.env.NODE_ENV === "production"
  ? {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }
  : {
      host: "localhost",
      user: "root",
      password: "0826",
      database: "vue_demo",
    };

const db = mysql.createConnection(config);

// 连接数据库
db.connect((err) => {
  if (err) {
    console.log("数据库连接失败：", err);
    return;
  }

  console.log("MySQL连接成功！");
});

module.exports = db;