import * as TodoModel from "../models/TodoModel.js";

export const list = async (req, res, next) => {
  try {
    const list = await TodoModel.findAll();
    res.json({ code: 0, data: list });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title } = req.body;
    await TodoModel.create(title);
    res.send(true);
  } catch (err) {
    next(err);
  }
};

export const updateTitle = async (req, res, next) => {
  try {
    const { id, title } = req.body;
    const data = await TodoModel.update(id, "title", title);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const completed = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await TodoModel.update(id, "is_completed", 1);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await TodoModel.deleteItem(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
};
