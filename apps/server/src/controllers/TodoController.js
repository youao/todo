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
    const data = await TodoModel.create();
    res.json({ code: 0, data });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await TodoModel.updateTitle();
    res.json({ code: 0, data });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const data = await TodoModel.deleteItem();
    res.json({ code: 0, data });
  } catch (err) {
    next(err);
  }
};
