import pool from "../config/db.js";

export const findAll = async (params) => {
  const { is_deleted = 0, is_completed, page = 1, page_size = 10 } = params;
  let whereSql = "WHERE is_deleted = " + is_deleted;
  if (is_completed == "0" || is_completed == "1") {
    whereSql += " AND is_completed = " + is_completed;
  }
  const offset = (page - 1) * page_size;
  const sql =
    "SELECT * FROM todo " + whereSql + " ORDER BY id DESC LIMIT ? OFFSET ?";
  const [rows] = await pool.query(sql, [+page_size, offset]);
  const [[{ total }]] = await pool.query(
    "SELECT COUNT(*) AS total FROM todo " + whereSql,
    [1],
  );
  return {
    list: rows,
    total,
  };
};

export const create = async (title) => {
  const [result] = await pool.query("INSERT INTO todo (title) VALUES (?)", [
    title,
  ]);
  return {
    id: result.insertId,
    title,
  };
};

export const update = async (id, name, value) => {
  const [result] = await pool.query(
    "UPDATE todo SET " + name + " = ? WHERE id = ?",
    [value, id],
  );
  return true;
};

export const deleteItem = async (id) => {
  const [result] = await pool.query("DELETE FROM todo WHERE id = ?", [id]);
  return true;
};
