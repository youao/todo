import pool from "../config/db.js";
import crypto from "node:crypto";

export const create = async (phone, pwd) => {
  const pwdMd5 = crypto.createHash("md5").update(pwd).digest("hex");
  const [result] = await pool.query(
    "INSERT INTO user (phone, pwd) VALUES (?, ?)",
    [phone, pwdMd5],
  );
  return [null, true];
};

export const findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);

  if (!rows?.[0]) {
    return [
      {
        code: 400,
        message: "no user",
      },
    ];
  }

  return [null, rows[0]];
};

export const findByPhone = async (phone) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE phone = ?", [phone]);

  if (!rows?.[0]) {
    return [
      {
        code: 400,
        message: "no user",
      },
    ];
  }

  return [null, rows[0]];
};

export const update = async (id, name, value) => {
  const [result] = await pool.query(
    "UPDATE user SET " + name + " = ? WHERE id = ?",
    [value, id],
  );
  return [null, true];
};