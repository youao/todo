import mysql from "mysql2/promise";

// 创建一个数据库连接
const connection = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123654",
  database: "test",
});

export default connection;
