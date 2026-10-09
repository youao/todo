import pool from "../config/db.js";

export const findAll = async () => {
  const [rows] = await pool.query("SELECT * FROM todo");
  return rows;
};

export const create = async () => {
  const title = "第一个任务";
  const [result] = await pool.query("INSERT INTO todo (title) VALUES (?)", [
    title,
  ]);
  return {
    id: result.insertId,
    title,
  };
};

export const updateTitle = async () => {
  const title = "第yi个任务";
  const [result] = await pool.query("UPDATE todo SET title = ? WHERE id = 1", [
    title,
  ]);
  console.log(result);
  return {
    // id: result.insertId,
    title,
  };
};

export const deleteItem = async () => {
  const id = 1;
  const [result] = await pool.query("DELETE FROM todo WHERE id = ?", [
    id,
  ]);
  console.log(result);
  return {
    // id: result.insertId,
    id,
  };
};
