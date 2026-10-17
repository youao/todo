import pool from "../config/db.js";
import crypto from "node:crypto";
import dayjs from "dayjs";

export const uidToToken = async (uid) => {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = cipher.update(`id=${uid}`, "utf8", "hex");
  const token = encrypted + cipher.final("hex");

  const expiredAt = dayjs().add(7, "day").format();
  const keyStr = key.toString("hex");
  const ivStr = iv.toString("hex");

  await pool.query(
    "INSERT INTO login_record (uid, token, expired_at, ikey, iv) VALUES (?, ?, ?, ?, ?)",
    [uid, token, expiredAt, keyStr, ivStr],
  );
  return [
    null,
    {
      token,
      expiredAt,
    },
  ];
};

export const tokenToUid = async (token) => {
  const [rows] = await pool.query(
    "SELECT * FROM login_record WHERE token = ?",
    [token],
  );

  if (!rows?.[0]) {
    return [
      {
        code: 401,
        message: "no token",
      },
    ];
  }

  const { ikey, iv, uid, expired_at } = rows[0];

  const now = new Date().getTime();
  const expiredTime = new Date(expired_at).getTime();
  if (now > expiredTime) {
    return [
      {
        code: 401,
        message: "token expired",
      },
    ];
  }

  const algorithm = "aes-256-cbc";
  const keyBuf = Buffer.from(ikey, "hex");
  const ivBuf = Buffer.from(iv, "hex");

  const decipher = crypto.createDecipheriv(algorithm, keyBuf, ivBuf);
  let decrypted = decipher.update(token, "hex", "utf8");
  decrypted += decipher.final("utf8");

  if (decrypted !== `id=${uid}`) {
    return [
      {
        code: 401,
        message: "auth failed",
      },
    ];
  }

  return [null, uid];
};
