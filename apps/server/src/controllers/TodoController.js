import * as TodoModel from "../models/TodoModel.js";

export const list = async (req, res, next) => {
  try {
    const uid = req.authUid;
    const params = { ...req.query, uid };
    const [err, data] = await TodoModel.findAll(params);
    res.success(data);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const uid = req.authUid;
    const { title } = req.body;
    await TodoModel.create(title, uid);
    res.success();
  } catch (err) {
    next(err);
  }
};

export const updateTitle = async (req, res, next) => {
  try {
    const { id, title } = req.body;
    await TodoModel.update(id, "title", title);
    res.success();
  } catch (err) {
    next(err);
  }
};

export const setCompleted = async (req, res, next) => {
  try {
    const { id, is_completed } = req.body;
    await TodoModel.update(id, "is_completed", is_completed);
    res.success();
  } catch (err) {
    next(err);
  }
};

export const setDeleted = async (req, res, next) => {
  try {
    const { id, is_deleted } = req.body;
    await TodoModel.update(id, "is_deleted", is_deleted);
    res.success();
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    await TodoModel.deleteItem(id);
    res.success();
  } catch (err) {
    next(err);
  }
};
