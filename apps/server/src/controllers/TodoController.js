import * as TodoModel from "../models/TodoModel.js";

export const list = async (req, res, next) => {
  try {
    const uid = req.authUid;
    const params = { ...req.query, uid };
    const [err, data] = await TodoModel.findAll(params);
    res.json({
      code: 200,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title } = req.body;
    await TodoModel.create(title);
    res.json({
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTitle = async (req, res, next) => {
  try {
    const { id, title } = req.body;
    const data = await TodoModel.update(id, "title", title);
    res.json({
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

export const setCompleted = async (req, res, next) => {
  try {
    const { id, is_completed } = req.body;
    const data = await TodoModel.update(id, "is_completed", is_completed);
    res.json({
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

export const setDeleted = async (req, res, next) => {
  try {
    const { id, is_deleted } = req.body;
    const data = await TodoModel.update(id, "is_deleted", is_deleted);
    res.json({
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await TodoModel.deleteItem(id);
    res.json({
      code: 200,
    });
  } catch (err) {
    next(err);
  }
};
