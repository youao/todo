import pool from "../config/db.js";

export const findAll = async () => {
  const [rows] = await pool.query("SELECT * FROM todo");
  return rows;
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
