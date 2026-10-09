import express from "express";
import installRoutes from "./routes/routes.js";

// import mysql from "mysql2/promise";

const app = express();
const port = 3000;

installRoutes(app);

// // 创建一个数据库连接
// const connection = await mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "123654",
//   database: "test",
// });

app.get("/", (req, res) => {
  // // 简单查询
  // try {
  //   const [results] = await connection.query("SELECT * FROM `todo`");

  //   console.log(results); // 结果集
  //   res.send(results);
  // } catch (err) {
  //   console.log(err);
  // }
  res.send("Hello Todo!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
