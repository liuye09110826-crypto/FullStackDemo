const mysql = require("mysql2");

// 创建连接
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0826",
  database: "vue_demo"
});

// 连接数据库
db.connect((err) => {
  if (err) {
    console.log("数据库连接失败：", err);
    return;
  }

  console.log("MySQL连接成功！");
});

module.exports = db;