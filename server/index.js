const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./db");

const app = express();   //Express创建了一个 Web 服务器

app.use(cors({
  origin: true,
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));
app.use(helmet());

// 登录接口
app.post("/api/login", (req, res) => {
  console.log("收到数据:",req.body);
  const { username, password } = req.body; //app.use(express.json());

  // 根据用户名查询用户
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {

    if (err) {
      return res.send({
        code: 500,
        message: "数据库错误"
      });
    }

    // 用户不存在
    if (result.length === 0) {
      return res.send({
        code: 404,
        message: "用户不存在"
      });
    }

    // 取出查询到的用户
    const user = result[0];

    // 判断密码
    if (user.password !== password) {
      return res.send({
        code: 401,
        message: "密码错误"
      });
    }

    // 登录成功
    res.send({
      code: 200,
      message: "登录成功",
      token: "token-" + Date.now()
    });

  });

});

// 注册接口
app.post("/api/register", (req, res) => {

  const { username, password } = req.body;

  // 查询用户名是否存在
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {

    if (err) {
      return res.send({
        code: 500,
        message: "数据库错误"
      });
    }

    // 用户名已存在
    if (result.length > 0) {
      return res.send({
        code: 400,
        message: "用户名已存在"
      });
    }

    // 插入新用户
    const insertSql =
      "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(insertSql, [username, password], (err, result) => {
      if (err) {
        console.log("注册SQL错误：", err);

        return res.send({
          code: 500,
          message: err.message
        });
      }
      res.send({
        code: 200,
        message: "注册成功",
        token:"token-" + Date.now()
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `服务器启动成功:${PORT}`
  );
});